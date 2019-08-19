import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Grid, withStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";

// import isEmpty from "../../validation/is-empty";

import {
    // clearErrors,
    // deleteExercise,
    getAllExercise,
    // getExercise,
    // saveExercise,
    // updateExercise
} from "../../actions/exerciseActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import CheckIcon from '@material-ui/icons/Check';
// import RemoveIcon from '@material-ui/icons/Remove';


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

            addExerciseA: [],
            addExerciseB: [],
            exerciseA: '',
            exerciseB: '',
        });

        this.onChange = this.onChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }


    componentDidMount() {
        this.props.getAllExercise();
    };

    onChange(event, ab) {

        if (ab === 'a') {
            const e = this.state.addExerciseA;
            const i = e.findIndex(e => e === event.target.value);

            if (i < 0 || e.length === 0) {
                e.push(event.target.value);
                this.setState({addExerciseA: e});
            }
        }

        if (ab === 'b') {
            const e = this.state.addExerciseB;
            const i = e.findIndex(e => e === event.target.value);

            if (i < 0 || e.length === 0) {
                e.push(event.target.value);
                this.setState({addExerciseB: e});
            }
        }
    };

    onDeleteClick(index, ab) {
        if (ab === 'a') {
            const e = this.state.addExerciseA;
            e.splice(index, 1);
            this.setState({addExerciseA: e});
        }

        if (ab === 'b') {
            const e = this.state.addExerciseB;
            e.splice(index, 1);
            this.setState({addExerciseB: e});
        }
    }

    render() {
        const {classes} = this.props;
        const {loading, exercise} = this.props.exercise;
        // const {errors} = this.state;

        let button_text = 'add';
        // routineDay._id ? button_text = 'update' : button_text = 'add';

        let exerciseView = [];

        if (!loading) {
            exerciseView.push(
                <Grid container justify="center">
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
                            {exercise.map((row, index) => {
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
                <Grid item xs={12}>
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"c"}>
                        {this.state.addExerciseA.map((a_row, index) => {
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
                                    <ListItemText primary={a_row}/>

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
                <Grid container justify="center">
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
                            {exercise.map((row, index) => {
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
                <Grid item xs={12}>
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"c"}>
                        {this.state.addExerciseB.map((b_row, index) => {
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
                                    <ListItemText primary={b_row}/>

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
                <div>
                    <Grid container style={{width: "auto"}} justify="center">
                        <Button
                            size={"medium"}
                            variant={"contained"}
                            color="primary"
                            onClick={this.onSubmit}
                            className={classes.buttonPadding}>
                            {button_text}
                        </Button>
                        <Button
                            size={"medium"}
                            variant={"contained"}
                            color="inherit"
                            onClick={this.onCancel}
                            className={classes.buttonPadding}>
                            cancel
                        </Button>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {loading ? (
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
    getAllExercise: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    exercise: state.exercise,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getAllExercise,
})(withStyles(styles)(ExerciseForAb));
