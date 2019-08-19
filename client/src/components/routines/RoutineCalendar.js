import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import * as moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import clsx from "clsx";
import format from "date-fns/format";
import {IconButton} from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {getRoutine} from '../../actions/routineActions';
import {getWorkout, createWorkout, selectWorkout} from '../../actions/workoutActions';

const DATE_FORMAT = 'YYYY-MM-DD';

const styles = theme => ({
    pickerGrid: {
        width: '100%',
    },
    kgsReps: {
        width: 5,
        border: 0,
        paddingLeft: 4,
    },
    kgRep: {
        width: 40,
        border: 0,
        paddingRight: 0,
    },
    tableCell1: {
        width: 400,
        border: 0,
    },
    //Card rgba(51, 110, 123, 1)
    card: {
        // paddingBottom: 0
        // borderStyle: "solid",
        // borderColor: theme.palette.primary.main,
        // borderColor: 'rgba(96, 125, 139, 1)',
        // boxShadow: 'rgba(255, 0, 0, 0.117647) 0px 2px 10px, rgba(255, 0, 0, 0.117647) 0px 2px 8px'
        // boxShadow: 'rgba(96, 125, 139, 1) 0px 1px 6px, rgba(96, 125, 139, 1) 0px 1px 4px'
    },
    cardPadding: {
        // padding: 16,
        "&:last-child": {
            paddingBottom: 0
        }
    },
    //KeyboardDatePicker
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",                                //älä koske
        color: "inherit",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    daySelectable: {
        background: '#cfd8dc',
        // background: theme.palette.primary.light,
        color: theme.palette.common.white,
        // color: theme.palette.primary.main,
        borderRadius: "50%",
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",                                //älä koske
        textIndent: -2,                                 //toimii:  siirtää päivänumero vasemmalle pallukan sisällä
    },
    daySelected: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: "50%",
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",                                //älä koske
        textIndent: -2,                                 //toimii:  siirtää päivänumero vasemmalle pallukan sisällä
    },
    //Workout details
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    dividerColor: {
        marginTop: 0,
        height: 2,
        backgroundColor: theme.palette.primary.main,
    },
});

class RoutineCalendar extends Component {
    constructor() {
        super();
        this.state = ({
            workouts: [],
            selectedDate: new Date(),
            workout: [],
            errors: {}
        });

        this.onDateChange = this.onDateChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.onCardAction = this.onCardAction.bind(this);
    };


    componentDidMount() {
        this.props.getRoutine();

        let d;
        if (this.props.workout.workout.workout !== undefined) {
            d = moment(this.props.workout.workout.workout.workout_date).format(DATE_FORMAT);
        } else {
            d = moment(new Date()).format(DATE_FORMAT);
        }

        this.setState({selectedDate: d});
        const workoutData = {
            workout_date: d
        };

        this.props.createWorkout(workoutData);
    };

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.routine.routine.workouts !== undefined) {
            if (props.routine.routine.workouts !== state.workouts) {
                return {
                    workouts: props.routine.routine.workouts,
                };
            }
        }

        if (props.workout.workout !== undefined) {
            if (props.workout.workout !== state.workout) {

                return {
                    workout: props.workout.workout,
                }
            }
        }
        return null;
    };

    shouldDisableDate(day) {
        const index = this.state.workouts.findIndex(d => moment(d.date).format(DATE_FORMAT) === moment(day).format(DATE_FORMAT));
        return index < 0;
    };

    isDateSelectable(date) {
        const index = this.state.workouts.findIndex(d => moment(d.date).format(DATE_FORMAT) === moment(date).format(DATE_FORMAT));
        return index >= 0;
    };

    renderDay = (date, selectedDate, dayInCurrentMonth) => {
        const {classes} = this.props;

        const dayIsSelectable = this.isDateSelectable(date);
        const dayIsSelected = moment(selectedDate).format(DATE_FORMAT) === moment(date).format(DATE_FORMAT);

        const wrapperClassName = clsx({
            [classes.daySelectable]: dayIsSelectable,
            [classes.daySelected]: dayIsSelected,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,

            // [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsSelectable,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(date, "d")} </span>
                </IconButton>
            </div>
        );
    };

    onAccept(date) {
        this.setState({selectedDate: date});
        const workoutData = {
            workout_date: moment(date).format(DATE_FORMAT)
        };
        this.props.createWorkout(workoutData);
    };

    onCardAction(number, event) {
        const workoutData = {
            workout_date: moment(this.state.selectedDate).format(DATE_FORMAT),
            exercise: this.state.workout.workout.exercises[number].exercise
        };
        this.props.selectWorkout(workoutData);
        this.props.history.push('/workout');
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    onDateChange(date) {
        this.setState({selectedDate: date});
    };

    onOpen() {
        if (this.state.workouts
            .findIndex(d =>
                moment(d.date).format(DATE_FORMAT) ===
                moment(this.state.selectedDate).format(DATE_FORMAT)) < 0) {

            for (let i = 0; i < this.state.workouts.length; i++) {
                if (moment(this.state.workouts[i].date).format(DATE_FORMAT) >
                    moment(this.state.selectedDate).format(DATE_FORMAT)) {
                    this.setState({selectedDate: this.state.workouts[i].date});
                    break;
                }
            }
        }
    }

    render() {
        const {classes} = this.props;
        const {loading} = this.props.workout;

        let datePicker = [];
        let workoutTable = [];

        if (!loading) {
            datePicker.push(
                <div key={'a'}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container className={classes.pickerGrid} justify="center">
                            <KeyboardDatePicker
                                shouldDisableDate={day => this.shouldDisableDate(day)}
                                renderDay={this.renderDay}
                                autoOk={"true"}
                                onAccept={date => this.onAccept(date)}
                                onOpen={() => this.onOpen()}
                                onChange={date => this.onDateChange(date)}
                                disablePast={true}
                                id="mui-pickers-date"
                                label="Workout Calendar"
                                name={"selectedDate"}
                                value={this.state.selectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'selectedDate',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <br/>
                </div>
            );

            if (this.state.workout.length === 0) {
                workoutTable.push(
                    <Grid key="n">
                        <Typography
                            color="primary"
                            variant="h6">
                            No planned workouts for this date.
                        </Typography>
                    </Grid>
                )
            } else {

                workoutTable =
                    <div>
                        <main className={classes.layout}>
                            {this.state.workout.workout.exercises.map((exercise_row, i) => {
                                return (
                                    <div key={i}>
                                        <Card
                                            className={classes.card}
                                            elevation={5}>
                                            <CardActionArea>
                                                <CardActions onClick={this.onCardAction.bind(this, i)}>
                                                    <CardContent className={classes.cardPadding}>
                                                        <Typography
                                                            value={exercise_row.exercise}
                                                            name={"exercise"}
                                                        >
                                                            {exercise_row.exercise}
                                                        </Typography>
                                                        <Divider
                                                            classes={{
                                                                root: classes.dividerColor,
                                                            }}
                                                        />
                                                        <Table
                                                            size="small"
                                                            key={i}>
                                                            <TableBody>
                                                                {this.state.workout.workout.exercises[i].sets.map((sets_row, ii) => {
                                                                    return (
                                                                        <TableRow
                                                                            className={classes.row}
                                                                            key={ii}>
                                                                            <TableCell
                                                                                className={classes.tableCell1}>
                                                                            </TableCell>
                                                                            <TableCell className={classes.kgRep}
                                                                                       align="right">
                                                                                {(() => {
                                                                                    var num = parseFloat(sets_row.weight);
                                                                                    return num.toFixed(1);
                                                                                })()}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                className={classes.kgsReps}
                                                                                align="right">
                                                                                kgs
                                                                            </TableCell>
                                                                            <TableCell
                                                                                className={classes.kgRep}
                                                                                align="right">
                                                                                {sets_row.reps}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                className={classes.kgsReps}
                                                                                align="right">
                                                                                reps
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </CardContent>
                                                </CardActions>
                                            </CardActionArea>
                                        </Card>
                                        <br/>
                                    </div>
                                );
                            })}
                        </main>
                    </div>
            }
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
                        <div>
                            {datePicker}
                            <Grid container justify="center">
                                {workoutTable}
                            </Grid>
                        </div>
                    )}
            </div>
        );
    }
}

RoutineCalendar.propTypes = {
    getRoutine: PropTypes.func.isRequired,
    createWorkout: PropTypes.func.isRequired,
    getWorkout: PropTypes.func.isRequired,
    selectWorkout: PropTypes.func.isRequired,
    routine: PropTypes.object.isRequired,
    workout: PropTypes.object.isRequired,
};

const
    mapStateToProps = (state) => ({
        routine: state.routine,
        workout: state.workout,
        errors: state.errors
    });

export default connect(mapStateToProps, {
    getRoutine,
    createWorkout,
    getWorkout,
    selectWorkout
})(withStyles(styles)(RoutineCalendar));