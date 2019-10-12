import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

import * as moment from 'moment';
import isEmpty from "../../validation/is-empty";

import {getRoutine, updateRoutine} from '../../actions/routineActions';

const DATE_FORMAT = 'YYYY-MM-DD';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 580,
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    exerciseHeader: {
        width: 120,
        marginRight: 5
    },
    expandedPanel: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
    kg: {
        width: 90,
        marginRight: 20
    },
    reps: {
        width: 80,
    },
    maxGrid: {
        width: "50%",
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    buttonPadding: {
        marginTop: 10,
        marginBottom: 10,
        width: 150
    },
    buttonJustify: {
        justifyContent: 'center',
    },
    boxPadding: {
        paddingLeft: 0
    },
    expansionPanel:{
        backgroundColor: 'transparent'
    }
});

class RoutineTable extends Component {
    constructor() {
        super();
        this.state = ({
            workouts: [],
            add_exercise_kg: 0,
            add_exercise_reps: 0,

            expandedPanel: '',
            routine_errors: {},
            update: false,
            changed: false,
            // initFinished: [],
        });

        this.onChecked = this.onChecked.bind(this);
        this.onCheckUpdate = this.onCheckUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeAdditional = this.onChangeAdditional.bind(this);
        this.onUpdateRoutine = this.onUpdateRoutine.bind(this);
    };

    onChecked = panel => event => {
        let p = panel === this.state.expandedPanel ? '' : panel;
        this.setState({expandedPanel: p});
    };

    componentDidMount() {
        this.props.getRoutine();
    };

    static getDerivedStateFromProps(props, state) {
        if (props.routine_errors !== state.routine_errors) {
            return {routine_errors: props.routine_errors};
        }

        if (props.routine.routine.workouts !== undefined) {
            if (props.routine.routine.workouts !== state.workouts) {

                return {
                    workouts: props.routine.routine.workouts,
                };
            }
        }
        return null;
    };

    onChange(event) {
        // this.setState({changed: true});

        let wo = this.state.workouts;
        wo[this.state.expandedPanel][event.target.name] = event.target.value;
        this.setState({workouts: wo});
    }

    onChangeAdditional(ind, event) {
        // this.setState({changed: true});

        let wo = this.state.workouts;
        wo[this.state.expandedPanel].add_exercises[ind][event.target.name] = event.target.value;
        this.setState({workouts: wo});
    }

    onUpdateRoutine(event) {
        const updatedRoutine = {
            week: this.state.workouts[this.state.expandedPanel].week,
            date: this.state.workouts[this.state.expandedPanel].date,
            exercise1: this.state.workouts[this.state.expandedPanel].exercise1,
            exercise1_kg: this.state.workouts[this.state.expandedPanel].exercise1_kg,
            exercise1_reps: this.state.workouts[this.state.expandedPanel].exercise1_reps,
            exercise2: this.state.workouts[this.state.expandedPanel].exercise2,
            exercise2_kg: this.state.workouts[this.state.expandedPanel].exercise2_kg,
            exercise2_reps: this.state.workouts[this.state.expandedPanel].exercise2_reps,
            exercise3: this.state.workouts[this.state.expandedPanel].exercise3,
            exercise3_kg: this.state.workouts[this.state.expandedPanel].exercise3_kg,
            exercise3_reps: this.state.workouts[this.state.expandedPanel].exercise3_reps,
            add_exercises: this.state.workouts[this.state.expandedPanel].add_exercises,
        };

        // this.setState({changed: false, update: false});

        this.props.updateRoutine(updatedRoutine, this.props.history);
    }

    onCheckUpdate = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes} = this.props;
        const {routine, routine_loading, routine_errors} = this.props.routine;

        let routineLines;

        if (!routine_loading && routine.workouts) {
            if (!this.state.workouts) {
                routineLines =
                    <Grid container className={classes.root} justify="center">
                        <Typography align={"center"} color="primary" variant="h6">
                            No Routine data found.
                        </Typography>
                    </Grid>
            } else {
                routineLines =
                    <div className={classes.root}>
                        {this.state.workouts.map((row, index) => {
                            return (
                                <ExpansionPanel
                                    className={classes.expansionPanel}
                                    expanded={this.state.expandedPanel === index}
                                    onChange={this.onChecked(index)}
                                    key={index}
                                >
                                    <ExpansionPanelSummary
                                        classes={{expanded: classes.expandedPanel}}
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        <Typography
                                            className={classes.heading}
                                        >
                                            Week: {this.state.workouts[index].week}
                                        </Typography>
                                        <div>
                                            <Typography
                                                className={classes.heading}
                                            >
                                                Date: {(moment(this.state.workouts[index].date).format(DATE_FORMAT))}
                                            </Typography>
                                            <Typography
                                                display="inline"
                                                variant={"caption"}
                                            >
                                                {moment(this.state.workouts[index].date).format('dddd')}
                                            </Typography>
                                        </div>
                                    </ExpansionPanelSummary>

                                    {/* 5x5 exercises ----> */}

                                    <div>
                                        <ExpansionPanelDetails className={classes.details}>
                                            <div className={classes.column}>
                                                <Typography
                                                    className={classes.exerciseHeader}
                                                >
                                                    {this.state.workouts[index].exercise1}
                                                </Typography>
                                            </div>

                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.kg}
                                                    value={this.state.workouts[index].exercise1_kg}
                                                    error={!isEmpty(routine_errors.exercise1_kg)}
                                                    helperText={routine_errors.exercise1_kg}
                                                    name="exercise1_kg"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "20", max: "500", step: "2.50"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">kg</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.reps}
                                                    value={this.state.workouts[index].exercise1_reps}
                                                    error={!isEmpty(routine_errors.exercise1_reps)}
                                                    helperText={routine_errors.exercise1_reps}
                                                    name="exercise1_reps"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "1", max: "20", step: "1"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">reps</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                        </ExpansionPanelDetails>

                                        <ExpansionPanelDetails className={classes.details}>
                                            <div className={classes.column}>
                                                <Typography
                                                    className={classes.exerciseHeader}
                                                >
                                                    {this.state.workouts[index].exercise2}
                                                </Typography>
                                            </div>

                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.kg}
                                                    value={this.state.workouts[index].exercise2_kg}
                                                    error={!isEmpty(routine_errors.exercise2_kg)}
                                                    helperText={routine_errors.exercise2_kg}
                                                    name="exercise2_kg"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "20", max: "500", step: "2.50"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">kg</InputAdornment>,
                                                    }}
                                                />
                                            </div>

                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.reps}
                                                    value={this.state.workouts[index].exercise2_reps}
                                                    error={!isEmpty(routine_errors.exercise2_reps)}
                                                    helperText={routine_errors.exercise2_reps}
                                                    name="exercise2_reps"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "1", max: "20", step: "1"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">reps</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                        </ExpansionPanelDetails>

                                        <ExpansionPanelDetails className={classes.details}>

                                            <div className={classes.column}>
                                                <Typography
                                                    className={classes.exerciseHeader}
                                                >
                                                    {this.state.workouts[index].exercise3}
                                                </Typography>
                                            </div>

                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.kg}
                                                    value={this.state.workouts[index].exercise3_kg}
                                                    error={!isEmpty(routine_errors.exercise3_kg)}
                                                    helperText={routine_errors.exercise3_kg}
                                                    name="exercise3_kg"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "20", max: "500", step: "2.50"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">kg</InputAdornment>,
                                                    }}
                                                />
                                            </div>

                                            <div className={classes.column}>
                                                <TextField
                                                    className={classes.reps}
                                                    value={this.state.workouts[index].exercise3_reps}
                                                    error={!isEmpty(routine_errors.exercise3_reps)}
                                                    helperText={routine_errors.exercise3_reps}
                                                    name="exercise3_reps"
                                                    type="number"
                                                    onChange={this.onChange}
                                                    inputProps={{min: "1", max: "20", step: "1"}}
                                                    // eslint-disable-next-line
                                                    InputProps={{
                                                        endAdornment: <InputAdornment
                                                            position="end">reps</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                        </ExpansionPanelDetails>
                                    </div>

                                    {/* Additional exercises ----> */}

                                    <Divider style={{height: 2}}/>

                                    <div>
                                        <Typography style={{paddingLeft: 25, paddingTop: 5}}>
                                            Additional exercises:
                                        </Typography>
                                        {row.add_exercises.map((addExercise, ind) => {
                                                return (
                                                    <ExpansionPanelDetails className={classes.details}>
                                                        <div className={classes.column}>
                                                            <Typography
                                                                className={classes.exerciseHeader}
                                                            >
                                                                {addExercise.add_exercise}
                                                            </Typography>
                                                        </div>

                                                        <div className={classes.column}>
                                                            <TextField
                                                                className={classes.kg}
                                                                value={this.state.workouts[index].add_exercises[ind].add_exercise_kg}
                                                                error={!isEmpty(routine_errors.add_exercise_kg)}
                                                                helperText={routine_errors.add_exercise_kg}
                                                                name="add_exercise_kg"
                                                                type="number"
                                                                onChange={this.onChangeAdditional.bind(this, ind)}
                                                                inputProps={{min: "20", max: "500", step: "2.50"}}
                                                                // eslint-disable-next-line
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment
                                                                        position="end">kg</InputAdornment>,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className={classes.column}>
                                                            <TextField
                                                                className={classes.reps}

                                                                value={this.state.workouts[index].add_exercises[ind].add_exercise_reps}
                                                                error={!isEmpty(routine_errors.add_exercise_reps)}
                                                                helperText={routine_errors.add_exercise_reps}
                                                                name="add_exercise_reps"

                                                                type="number"
                                                                onChange={this.onChangeAdditional.bind(this, ind)}
                                                                inputProps={{min: "1", max: "20", step: "1"}}
                                                                // eslint-disable-next-line
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment
                                                                        position="end">reps</InputAdornment>,
                                                                }}
                                                            />
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                )
                                            }
                                        )}
                                    </div>

                                    <Divider style={{height: 2}}/>

                                    {/* Update button ----> */}

                                    <ExpansionPanelActions className={classes.buttonJustify}>
                                        <Button
                                            className={classes.buttonPadding}
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onUpdateRoutine}
                                        >
                                            update
                                        </Button>
                                    </ExpansionPanelActions>

                                </ExpansionPanel>
                            )
                        })}
                    </div>
            }
        }

        return (
            <div>
                {routine_loading ? (
                        <Grid container justify="center">
                            <CircularProgress className={classes.progress}/>
                        </Grid>
                    )
                    :
                    (
                        <Grid container justify="center">
                            <div className={classes.root}>
                                {routineLines}
                            </div>
                        </Grid>

                    )}
            </div>
        );
    }
}

RoutineTable.propTypes = {
    getRoutine: PropTypes.func.isRequired,
    updateRoutine: PropTypes.func.isRequired,
    routine: PropTypes.object.isRequired,
};

const
    mapStateToProps = (state) => ({
        routine: state.routine,
        routine_errors: state.routine_errors
    });

export default connect(mapStateToProps, {getRoutine, updateRoutine})(withStyles(styles)(RoutineTable));