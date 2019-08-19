import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from "@material-ui/core/CircularProgress";


import {getRoutineDay, saveRoutineDay} from '../../actions/routineDayActions';
import isEmpty from "../../validation/is-empty";

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
            errors: {},
            routineDay: {},
            stateInitialized: false,

            tab: 0,
            value: 'one',
        });
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        // this.handleChange = this.handleChange(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        this.props.getRoutineDay();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.routineDay.routineDay !== state.routineDay && !state.stateInitialized) {
            const routineDay = props.routineDay.routineDay;

            // If routine day field doesnt exist, make empty string
            routineDay.exercise11 = !isEmpty(routineDay.exercise11) ? routineDay.exercise11 : 'Squat';
            routineDay.exercise12 = !isEmpty(routineDay.exercise12) ? routineDay.exercise12 : 'Bench Press';
            routineDay.exercise13 = !isEmpty(routineDay.exercise13) ? routineDay.exercise13 : 'Barbell Row';
            routineDay.exercise21 = !isEmpty(routineDay.exercise21) ? routineDay.exercise21 : 'Squat';
            routineDay.exercise22 = !isEmpty(routineDay.exercise22) ? routineDay.exercise22 : 'Overhead Press';
            routineDay.exercise23 = !isEmpty(routineDay.exercise23) ? routineDay.exercise23 : 'Deadlift';

            return ({
                exercise11: routineDay.exercise11,
                exercise12: routineDay.exercise12,
                exercise13: routineDay.exercise13,
                exercise21: routineDay.exercise21,
                exercise22: routineDay.exercise22,
                exercise23: routineDay.exercise23,
                stateInitialized: true,
                routineDay: props.routineDay.routineDay
            });
        }
        return null;
    }


    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit() {
        const routineDayData = {
            exercise11: this.state.exercise11,
            exercise12: this.state.exercise12,
            exercise13: this.state.exercise13,
            exercise21: this.state.exercise11,
            exercise22: this.state.exercise22,
            exercise23: this.state.exercise23,
        };

        this.props.saveRoutineDay(routineDayData, this.props.history);
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
        const {classes} = this.props;
        const {errors} = this.state;
        const {routineDay, loading} = this.props.routineDay;

        let button_text = '';
        routineDay._id ? button_text = 'update' : button_text = 'add';

        let exerciseView;

        if (!loading) {
            exerciseView =
                <Grid container justify="center">
                    <Typography align={"center"} color="primary" variant="h6">
                        Workout A
                    </Typography>
                    <TextField
                        value={this.state.exercise11}
                        error={!isEmpty(errors.exercise11)}
                        helperText={errors.exercise11}
                        label="Exercise 1"
                        name="exercise11"
                        fullWidth
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.exercise12}
                        error={!isEmpty(errors.exercise12)}
                        helperText={errors.exercise12}
                        label="Exercise 2"
                        name="exercise12"
                        fullWidth
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.exercise13}
                        error={!isEmpty(errors.exercise13)}
                        helperText={errors.exercise13}
                        label="Exercise 3"
                        name="exercise13"
                        fullWidth
                        onChange={this.onChange}
                    />

                    {/*<Divider className={classes.divider}/>*/}

                    <Typography
                        // className={classes.divider}
                        align={"center"}
                        color="primary"
                        variant="h6"
                    >
                        Workout B
                    </Typography>

                    <TextField
                        value={this.state.exercise11}
                        error={!isEmpty(errors.exercise21)}
                        helperText={errors.exercise21}
                        label="Exercise 1"
                        name="exercise11"
                        fullWidth
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.exercise22}
                        error={!isEmpty(errors.exercise22)}
                        helperText={errors.exercise22}
                        label="Exercise 2"
                        name="exercise22"
                        fullWidth
                        onChange={this.onChange}
                    />
                    <TextField
                        value={this.state.exercise23}
                        error={!isEmpty(errors.exercise23)}
                        helperText={errors.exercise23}
                        label="Exercise 3"
                        name="exercise23"
                        fullWidth
                        onChange={this.onChange}
                    />


                    <Button
                        size={"medium"}
                        variant={"contained"}
                        color="primary"
                        onClick={this.onSubmit}
                        className={classes.buttonPadding}
                    >
                        {button_text}
                    </Button>
                    <Button
                        size={"medium"}
                        variant={"contained"}
                        color="inherit"
                        onClick={this.onCancel}
                        className={classes.buttonPadding}
                    >
                        cancel
                    </Button>

                </Grid>
        }

        return (
            <div>
                {loading ? (
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
    routineDay: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    routineDay: state.routineDay,
    errors: state.errors,
});

export default connect(mapStateToProps, {getRoutineDay, saveRoutineDay})(withStyles(styles)(Exercise5x5));