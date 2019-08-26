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
import {getPlan} from "../../actions/planActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as moment from "moment";
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
    size: {
        width: 10,
        height: 10,
    },
    listItem: {
        background: theme.palette.primary.A100,
    },
});


class ExerciseByDay extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            errors: {},

            addExercise: [],
            exercise: '',
            days: [],
            selected: 'day1',
        });

        this.onChange = this.onChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onSelectClick = this.onSelectClick.bind(this);
    }

    componentDidMount() {
        this.props.getPlan();
        this.props.getAllExercise();
    };

    static getDerivedStateFromProps(props, state) {
        if (props.plan.plan !== state.plan) {

            let wo_dates = [];
            wo_dates.push(props.plan.plan.monday);
            wo_dates.push(props.plan.plan.tuesday);
            wo_dates.push(props.plan.plan.wednesday);
            wo_dates.push(props.plan.plan.thursday);
            wo_dates.push(props.plan.plan.friday);
            wo_dates.push(props.plan.plan.saturday);
            wo_dates.push(props.plan.plan.sunday);

            let days = [];
            for (let i = 0; i <= wo_dates.length; i++) {
                if (wo_dates[i] === true) {
                    days.push(i + 1);
                }
            }

            return {
                days: days
            }
        }
        return null;
    }

    onChange(event) {
        let e = this.state.addExercise;

        const i = e.findIndex(e => e === event.target.value);

        if (i < 0 || e.length === 0) {
            const exercise = {
                week_day: this.state.selected,
                add_exercise: event.target.value
            };

            e.push(exercise);
            e.sort((a, b) => (a.week_day > b.week_day) ? 1 : ((b.week_day > a.week_day) ? -1 : 0));

            this.setState({addExercise: e});
        }
    };

    onDeleteClick(index) {
        let e = this.state.addExercise;
        e.splice(index, 1);
        this.setState({addExercise: e});
    }

    onChecked = name => event => {
        this.setState({[name]: event.target.checked});
    };

    onSelectClick(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {classes} = this.props;
        const {exercise} = this.props.exercise;
        // const {plan} = this.props.plan;
        // const {errors} = this.state;
        const exercise_loading = this.props.exercise.loading;
        const plan_loading = this.props.plan.loading;

        let button_text = 'add';
        // routineDay._id ? button_text = 'update' : button_text = 'add';

        let exerciseView = [];

        if (!exercise_loading && !plan_loading) {
            exerciseView.push(
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            align={"center"}
                            color="primary"
                            variant="h6"
                        >
                            Additional exercises for workout days
                        </Typography>
                    </Grid>

                    <Grid container justify="space-evenly">
                        <RadioGroup
                            aria-label="selected"
                            name="selected"
                            value={this.state.selected}
                            onChange={this.onSelectClick}
                            row
                        >
                            <FormControlLabel
                                value="0"
                                control={<Radio color="primary"/>}
                                label={moment.weekdays(this.state.days[0])}
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary"/>}
                                label={moment.weekdays(this.state.days[1])}
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary"/>}
                                label={moment.weekdays(this.state.days[2])}
                                labelPlacement="top"
                            />
                        </RadioGroup>
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
                            value={this.state.exercise}
                            // error={!isEmpty(errors.category)}
                            onChange={event => this.onChange(event)}
                            name="exercise"

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
                        {this.state.addExercise.map((add_row, index) => {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    divider
                                    alignItems='flex-start'
                                    key={index}
                                    index={index}
                                    button
                                    selected={this.state.selectedIndex === index}
                                    // onClick={event => this.onListItemClick(event, index)}
                                >
                                    <ListItemText
                                        primary={moment.weekdays(this.state.days[add_row.week_day])}
                                        secondary={add_row.add_exercise}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={event => this.onDeleteClick(index)}
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
                            className={classes.buttonPadding}
                            variant={"contained"}
                            color="primary"
                            onClick={this.onSubmit}
                        >
                            {button_text}
                        </Button>
                        {/*<Button*/}
                        {/*    size={"medium"}*/}
                        {/*    variant={"contained"}*/}
                        {/*    color="inherit"*/}
                        {/*    onClick={this.onCancel}*/}
                        {/*    className={classes.buttonPadding}>*/}
                        {/*    cancel*/}
                        {/*</Button>*/}
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {exercise_loading || plan_loading ? (
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

ExerciseByDay.propTypes = {
    getAllExercise: PropTypes.func.isRequired,
    getPlan: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    exercise: state.exercise,
    plan: state.plan,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getAllExercise,
    getPlan,
})(withStyles(styles)(ExerciseByDay));

