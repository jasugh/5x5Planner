import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";

import isEmpty from "../../validation/is-empty";
import {getRoutineDay, saveRoutineDay} from '../../actions/routineDayActions';
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
});

class Exercise5x5 extends Component {
    constructor() {
        super();
        this.state = ({
            exercise11: '',
            exercise12: '',
            exercise13: '',
            exercise21: '',
            exercise22: '',
            exercise23: '',
            // errors: {},
            routineDay: {},

            stateInitialized: false,

            tab: 0,
            value: 'one',
        });
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        // this.handleChange = this.handleChange(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        this.props.getRoutineDay();
        this.props.getAllExercise();
    }

    static getDerivedStateFromProps(props, state) {
        // if (props.errors !== state.errors) {
        //     return {errors: props.errors};
        // }

        if (props.routineDay.routineDay !== state.routineDay) {
            const routineDay = props.routineDay.routineDay;

            return ({
                exercise11: routineDay.exercise11,
                exercise12: routineDay.exercise12,
                exercise13: routineDay.exercise13,
                exercise21: routineDay.exercise21,
                exercise22: routineDay.exercise22,
                exercise23: routineDay.exercise23,

                routineDay: props.routineDay.routineDay
            });
        }
        return null;
    }


    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSave() {
        const routineDayData = {
            exercise11: this.state.exercise11,
            exercise12: this.state.exercise12,
            exercise13: this.state.exercise13,
            exercise21: this.state.exercise11,
            exercise22: this.state.exercise22,
            exercise23: this.state.exercise23,
        };

        this.props.saveRoutineDay(routineDayData);
    }

    onCancel() {
        this.props.history.push('/dashboard');
    }

    handleChangeTab(event, newTab) {
        this.setState({tab: newTab});
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    };

    render() {
        const {classes, errors} = this.props;
        const {routineDay, loading} = this.props.routineDay;
        const routineDay_loading = this.props.routineDay.loading;
        const {exercises} = this.props.exercise;
        const {exercise_loading} = this.props.exercise.loading;

        let button_text = '';
        routineDay._id ? button_text = 'update' : button_text = 'add';

        let exerciseView;

        if (!loading) {
            exerciseView =
                <Grid container justify="center">
                    <Typography align={"center"} color="primary" variant="h6">
                        Workout A
                    </Typography>
                    <Select
                        native
                        fullWidth
                        value={this.state.exercise11}
                        // error={!isEmpty(errors.category)}
                        onChange={this.onChange}
                        name="exercise11"

                    >
                        <option value="">
                            Select exercise 1...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    <Select
                        native
                        fullWidth
                        value={this.state.exercise12}
                        // error={!isEmpty(errors.category)}
                        onChange={this.onChange}
                        name="exercise12"

                    >
                        <option value="">
                            Select exercise 2...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    <Select
                        native
                        fullWidth
                        value={this.state.exercise13}
                        // error={!isEmpty(errors.category)}
                        onChange={this.onChange}
                        name="exercise13"

                    >
                        <option value="">
                            Select exercise 3...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    {/*<Divider className={classes.divider}/>*/}

                    <Typography
                        style={{paddingTop: 20}}
                        align={"center"}
                        color="primary"
                        variant="h6"
                    >
                        Workout B
                    </Typography>

                    <Select
                        native
                        fullWidth
                        value={this.state.exercise21}
                        // error={!isEmpty(errors.category)}
                        onChange={this.onChange}
                        name="exercise21"

                    >
                        <option value="">
                            Select exercise 1...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    <Select
                        native
                        fullWidth
                        value={this.state.exercise22}
                        error={!isEmpty(errors.exercise22)}
                        onChange={this.onChange}
                        name="exercise22"

                    >
                        <option value="">
                            Select exercise 2...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    <Select
                        style={{marginBottom: 30}}
                        native
                        fullWidth
                        value={this.state.exercise23}
                        // error={!isEmpty(errors.category)}
                        onChange={this.onChange}
                        name="exercise23"

                    >
                        <option value="">
                            Select exercise 3...
                        </option>
                        {exercises.map((row, index) => {
                            return (
                                <option key={row.name} value={row.name}>
                                    {row.name}
                                </option>
                            )
                        })}
                    </Select>

                    <Button
                        className={classes.buttonPadding}
                        variant={"contained"}
                        color="primary"
                        onClick={this.onSave}
                    >
                        {button_text}
                    </Button>
                </Grid>
        }

        return (
            <div>
                {routineDay_loading || exercise_loading ? (
                        <Grid container justify="center">
                            <CircularProgress/>
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

Exercise5x5.propTypes = {
    getRoutineDay: PropTypes.func.isRequired,
    saveRoutineDay: PropTypes.func.isRequired,
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
    saveRoutineDay,
    getAllExercise
})(withStyles(styles)(Exercise5x5));