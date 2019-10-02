import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Grid, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {getRoutineDay, saveAdditionalAB} from '../../actions/routineDayActions';
import {getAllExercise} from "../../actions/exerciseActions";

const styles = theme => ({
    buttonPadding: {
        margin: 10,
        width: 200,
        [theme.breakpoints.down("sm")]: {
            margin: 5,
            width: 150,
        }
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    deleteIcon: {
        color: theme.palette.secondary.main,
        // paddingBottom: 6
        fontSize: 20
    },
    listItem: {
        background: theme.palette.primary.A100,
    }
});

class ExerciseForAb extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            errors: {},

            add_exerciseA: [],
            add_exerciseB: [],
            exerciseA: '',
            exerciseB: '',
        });

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        this.props.getRoutineDay();
        this.props.getAllExercise();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.routineDay.routineDay !== state.routineDay) {
            const routineDay = props.routineDay.routineDay;

            let aeA = [];
            let aeB = [];

            if (routineDay.add_exerciseA && routineDay.add_exerciseB) {
                for (let i = 0; i < routineDay.add_exerciseA.length; i++) {
                    let add_exerciseFields = {
                        add_exercise: routineDay.add_exerciseA[i].add_exercise,
                        add_exercise_kg: 0,
                        add_exercise_reps: 0,
                    };
                    aeA.push(add_exerciseFields);
                }

                for (let i = 0; i < routineDay.add_exerciseB.length; i++) {
                    let add_exerciseFields = {
                        add_exercise: routineDay.add_exerciseB[i].add_exercise,
                        add_exercise_kg: 0,
                        add_exercise_reps: 0,
                    };
                    aeB.push(add_exerciseFields);
                }
            }

            return ({
                add_exerciseA: aeA,
                add_exerciseB: aeB,
                routineDay: props.routineDay.routineDay
            });
        }
        return null;
    }

    onChange(event, ab) {
        if (ab === 'a') {
            const e = this.state.add_exerciseA;
            const i = e.findIndex(e => e.add_exercise === event.target.value);

            if (i < 0 || e.length === 0) {
                let add_exerciseFields = {
                    add_exercise: event.target.value,
                    add_exercise_kg: 0,
                    add_exercise_reps: 0,
                };
                e.push(add_exerciseFields);
                this.setState({add_exerciseA: e});
            }
        }

        if (ab === 'b') {
            const e = this.state.add_exerciseB;
            const i = e.findIndex(e => e.add_exercise === event.target.value);

            if (i < 0 || e.length === 0) {
                let add_exerciseFields = {
                    add_exercise: event.target.value,
                    add_exercise_kg: 0,
                    add_exercise_reps: 0,
                };
                e.push(add_exerciseFields);
                this.setState({add_exerciseB: e});
            }
        }
    };

    onSave() {
        const addAB = {
            add_exerciseA: this.state.add_exerciseA,
            add_exerciseB: this.state.add_exerciseB,
        };

        this.props.saveAdditionalAB(addAB);
    }

    onDeleteClick(index, ab) {
        if (ab === 'a') {
            const e = this.state.add_exerciseA;
            e.splice(index, 1);
            this.setState({add_exerciseA: e});
        }

        if (ab === 'b') {
            const e = this.state.add_exerciseB;
            e.splice(index, 1);
            this.setState({add_exerciseB: e});
        }
    }

    render() {
        const {classes} = this.props;
        const {routineDay} = this.props.routineDay;
        const routineDay_loading = this.props.routineDay.loading;
        const {exercises} = this.props.exercise;
        const {exercise_loading} = this.props.exercise.loading;
        // const {errors} = this.state;

        let button_text = 'add';
        if (routineDay.add_exerciseA && routineDay.add_exerciseB) {
            if (routineDay.add_exerciseA.length > 0 || routineDay.add_exerciseB.length > 0) {
                button_text = 'update';
            }
        }

        let exerciseView = [];

        if (!routineDay_loading && !exercise_loading) {
            exerciseView.push(
                <Grid container justify="center" key={"a"}>
                    <Grid item xs={12}>
                        <Typography
                            align={"center"}
                            color="primary"
                            variant="h6"
                        >
                            Workout A
                        </Typography>
                    </Grid>


                    <Grid item xs={12}>
                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >
                            Additional Exercise:
                        </Typography>

                        <Select
                            native
                            fullWidth
                            value={this.state.exerciseA}
                            // error={!isEmpty(errors.category)}
                            onChange={event => this.onChange(event, 'a')}
                            name="exerciseA"

                        >
                            <option value="">
                                Select exercise...
                            </option>
                            {exercises.map((row, index) => {
                                return (
                                    <option key={row.name} value={row.name}>
                                        {row.name}
                                    </option>
                                )
                            })}
                        </Select>
                    </Grid>
                </Grid>
            );


            exerciseView.push(
                <Grid item xs={12} key={"b"}>
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav">
                        {this.state.add_exerciseA.map((a_row, index) => {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    divider
                                    key={index}
                                    index={index}
                                    button
                                    selected={this.state.selectedIndex === index}
                                    // onClick={event => this.onListItemClick(event, index)}
                                >
                                    <ListItemText primary={a_row.add_exercise}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={event => this.onDeleteClick(index, 'a')}
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon
                                                className={classes.deleteIcon}
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            );

            exerciseView.push(
                <Grid container justify="center" key={"c"}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.divider}
                            align={"center"}
                            color="primary"
                            variant="h6"
                        >
                            Workout B
                        </Typography>
                    </Grid>


                    <Grid item xs={12}>
                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >
                            Additional Exercise:
                        </Typography>

                        <Select
                            native
                            fullWidth
                            value={this.state.exerciseB}
                            // error={!isEmpty(errors.category)}
                            onChange={event => this.onChange(event, 'b')}
                            name="exerciseB"

                        >
                            <option value="">
                                Select exercise...
                            </option>
                            {exercises.map((row, index) => {
                                return (
                                    <option key={row.name} value={row.name}>
                                        {row.name}
                                    </option>
                                )
                            })}
                        </Select>
                    </Grid>
                </Grid>
            );

            exerciseView.push(
                <Grid item xs={12} key={"d"}>
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"c"}>
                        {this.state.add_exerciseB.map((b_row, index) => {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    divider
                                    key={index}
                                    index={index}
                                    button
                                    selected={this.state.selectedIndex === index}
                                    // onClick={event => this.onListItemClick(event, index)}
                                >
                                    <ListItemText primary={b_row.add_exercise}/>

                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={event => this.onDeleteClick(index, 'b')}
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon
                                                className={classes.deleteIcon}
                                            />
                                        </IconButton>
                                    </ListItemSecondaryAction>

                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            );

            exerciseView.push(
                <div key={"e"}>
                    <Grid container style={{width: "auto"}} justify="center">
                        <Button
                            className={classes.buttonPadding}
                            variant={"contained"}
                            color="primary"
                            onClick={this.onSave}
                        >
                            {button_text}
                        </Button>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {routineDay_loading || exercise_loading ? (
                        <Grid container justify="center">
                            <CircularProgress className={classes.progress}/>
                        </Grid>
                    )
                    :
                    (
                        <main className={classes.layout}>
                            {exerciseView}
                        </main>
                    )}
            </div>
        );
    }
}

ExerciseForAb.propTypes = {
    getRoutineDay: PropTypes.func.isRequired,
    saveAdditionalAB: PropTypes.func.isRequired,
    getAllExercise: PropTypes.func.isRequired,
    routineDay: PropTypes.object.isRequired,
    exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    routineDay: state.routineDay,
    exercise: state.exercise,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    getRoutineDay,
    saveAdditionalAB,
    getAllExercise
})(withStyles(styles)(ExerciseForAb));
