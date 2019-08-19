import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Grid} from "@material-ui/core";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import {updateWorkout} from '../../actions/workoutActions';
import {startRestTimer} from '../../actions/restTimerActions';
import isEmpty from "../../validation/is-empty";

const styles = theme => ({
    bar1Determinate: {
        background: theme.palette.secondary.main,
        // background: "linear-gradient(to left, #f44336, #607d8b)",
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    layout_narrow: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up(300 + theme.spacing(2) * 2)]: {
            width: 335,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    inputCenter: {
        textAlign: "center",
        color: theme.palette.primary.main,
    },
    //Table row selected ->
    tableRow: {
        "&$selected, &$selected:hover": {
            backgroundColor: theme.palette.primary.A100
        }
    },
    selected: {},
    //Table row selected <-
    dividerColor: {
        marginTop: 10,
        height:
            2,
        backgroundColor:
        theme.palette.primary.main,
    }
    ,
// blue         2196f3
// lightblue    03a9f4
// black        263238
// bluegrey     607d8b
// deeporange   ff5722
// red          f44336

    iconColor: {
        background: theme.palette.primary.A100
    },
    noteAddColorLight: {
        color: theme.palette.primary.A100
    },
    noteAddColorDark: {
        color: theme.palette.primary.main
    },
    paddingBottom: {
        paddingBottom: 10
    }
    ,
    inputSize: {
        width: 100,
    }
    ,
//Table
    noBorder: {
        border: 0,
    }
    ,
    kgsReps: {
        width: 5,
        border:
            0,
        paddingLeft:
            4,
    }
    ,
    kgRep: {
        width: 40,
        border:
            0,
        paddingRight:
            0,
    }
    ,
    tableCell1: {
        width: 400,
        border:
            0,
    }
    ,
    height: {
        height: 24
    },
    typography: {
        padding: theme.spacing(2),
    },
});

class Workout extends Component {
    constructor() {
        super();
        this.state = ({
            weight: 0,
            reps: 0,
            comment: '',
            add_comment: true,
            finished: false,
            startWeight: 0,
            startReps: 0,
            index: '',
            dialogOpen: false,
            alertOpen: false,
            error: {},

            //From props:
            workout: {},

            //Timer
            isOn: false,
            ready: false,
            time: 10000,
            restTime: 10000,
            progressTime: 0,
            completed: 0,
        });

        this.onChange = this.onChange.bind(this);
        this.onAddWeight = this.onAddWeight.bind(this);
        this.onReduceWeight = this.onReduceWeight.bind(this);
        this.onAddReps = this.onAddReps.bind(this);
        this.onReduceReps = this.onReduceReps.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onClickRow = this.onClickRow.bind(this);
        this.onOpenDialog = this.onOpenDialog.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onAlertClose = this.onAlertClose.bind(this);
        this.onGo = this.onGo.bind(this);
        this.onStay = this.onStay.bind(this);
        this.onSaveComment = this.onSaveComment.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onClickFinished = this.onClickFinished.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEmpty(prevState.error) && (!isEmpty(this.state.error))) {
            this.setState({error: {}})
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.workout.selected_workout !== state.workout) {
            if (state.startWeight === 0 && state.startReps === 0) {
                let s = [];
                let w = 0;
                let r = 0;

                if (props.workout.selected_workout.workout) {
                    s = props.workout.selected_workout.workout.exercises[0].sets;
                    w = s[s.length - 1].weight;
                    r = s[s.length - 1].reps;
                }

                return {
                    workout: props.workout.selected_workout.workout,
                    weight: w,
                    reps: r,
                    startWeight: w,
                    startReps: r,
                };
            } else {

                return {
                    workout: props.workout.selected_workout.workout,
                };
            }
        }

        return null;
    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    onSave(event) {
        if (this.state.reps === 0) {
            this.setState({error: {reps: 'Please enter Reps'}});
            return;
        }

        let w = this.state.workout;
        let s = this.props.workout.selected_workout.workout.exercises[0].sets;

        const set = {
            weight: this.state.weight,
            reps: this.state.reps,
            comment: '',
            finished: false
        };

        s.push(set);
        w.exercises[0].sets = s;

        this.setState({workout: w});
    }

    onClear(event) {
        this.setState({weight: 0, reps: 0})
    }

    onUpdate(event) {
        let w = this.state.workout;
        let s = this.props.workout.selected_workout.workout.exercises[0].sets;

        s[this.state.index].weight = this.state.weight;
        s[this.state.index].reps = this.state.reps;
        w.exercises[0].sets = s;

        this.setState({workout: w, index: ''});
    }

    onDelete(event) {
        let w = this.state.workout;
        w.exercises[0].sets.splice(this.state.index, 1);
        this.setState({workout: w, index: ''});
    }

    onAddWeight(event) {
        let w = this.state.weight;
        w = w + 2.5;
        if (w < 501) {
            this.setState({weight: w});
        }
    };

    onReduceWeight(event) {
        let w = this.state.weight;
        w = w - 2.5;
        if (w > 19) {
            this.setState({weight: w});
        }
    };

    onAddReps(event) {
        let r = this.state.reps;
        r++;
        if (r < 21) {
            this.setState({reps: r});
        }
    };

    onReduceReps(event) {
        let r = this.state.reps;
        r--;
        if (r > 0) {
            this.setState({reps: r});
        }
    };

    onOpenDialog(index) {
        if (!isEmpty(this.state.workout.exercises[0].sets[index].comment)) {
            this.setState({
                comment: this.state.workout.exercises[0].sets[index].comment
            });

            this.setState({add_comment: false})
        } else {
            this.setState({add_comment: true})
        }

        this.setState({dialogOpen: true, index: index});
    };

    onCloseDialog(event) {
        this.setState({dialogOpen: false, comment: ''});
    };

    onAlertClose(event) {
        this.setState({alertOpen: false});
    }

    onStay() {
        this.setState({alertOpen: false});
    }

    onGo() {
        this.setState({alertOpen: false});
        this.props.history.push('/routine/calendar');
    }

    onClickRow(index, event) {
        if (index === this.state.index) {
            this.setState({index: ''});
        } else {
            this.setState({
                index: index,
                weight: this.state.workout.exercises[0].sets[index].weight,
                reps: this.state.workout.exercises[0].sets[index].reps,
            });
        }
    };

    onSaveComment(event) {
        let w = this.state.workout;
        let s = this.state.workout.exercises[0].sets;

        s[this.state.index].comment = this.state.comment;
        w.exercises[0].sets = s;
        this.setState({workout: w, dialogOpen: false, index: '', comment: ''});
    }

    onDeleteComment(event) {
        let w = this.state.workout;
        let s = this.state.workout.exercises[0].sets;

        s[this.state.index].comment = '';
        w.exercises[0].sets = s;
        this.setState({workout: w, dialogOpen: false, index: ''});
    }

    onClickFinished(index, event) {
        let w = this.state.workout;
        let s = this.state.workout.exercises[0].sets;

        s[index].finished = !s[index].finished;
        w.exercises[0].sets = s;
        this.setState({workout: w});

        if (s[index].finished) {
            this.startTimer();
        }
    };

    startTimer() {
        this.props.startRestTimer();

        //Check if all exercises are finished if yes -> go back
        let s = this.state.workout.exercises[0].sets;
        let f = s.filter(f => f.finished === true).length;

        if (f === s.length) {
            this.props.updateWorkout(this.state.workout);

            this.setState({alertOpen: true});
        }
    };

    progress = () => {
        if (this.state.completed >= 100) {
            this.setState({completed: 0});
        } else {
            this.setState({completed: (this.state.progressTime / this.state.restTime) * 100});
        }
    };

    goBack(event) {
        this.props.history.push('/routine/calendar');
    }

    render() {
        const {classes} = this.props;
        const {loading} = this.props.workout;
        const {workout} = this.props.workout.selected_workout;

        let workoutTable = [];
        let weightsReps = [];
        let header;

        let save_update = 'update';
        let clear_delete = 'delete';

        if (this.state.index === '') {
            save_update = 'save';
            clear_delete = 'clear';
        }

        let save_update_comment = 'save';
        let cancel_delete_comment = 'cancel';

        if (this.state.add_comment === false) {
            save_update_comment = 'update';
            cancel_delete_comment = 'delete';
        }

        if (!loading && workout === undefined) {
            this.goBack();
        }

        //TODO: too many lines in the following if-statement
        if (!loading && workout !== undefined) {
            //Header
            header =
                <main className={classes.layout_narrow}>
                    <Grid container justify="center">
                        <Typography
                            className={classes.paddingBottom}
                            color="primary"
                            variant="h5"
                        >
                            {this.state.workout.exercises[0].exercise}
                        </Typography>
                    </Grid>

                    {/*<Grid style={{height: 40}} container justify="center">*/}
                    {/*    {restTimer}*/}
                    {/*</Grid>*/}

                    {/*<div className={classes.paddingBottom}>*/}
                    {/*    <LinearProgress*/}
                    {/*        classes={{*/}
                    {/*            bar1Determinate: classes.bar1Determinate,*/}
                    {/*        }}*/}
                    {/*        style={{height: 3}}*/}
                    {/*        variant="determinate"*/}
                    {/*        value={this.state.completed}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </main>;

            //Add - reduce kilos and reps
            weightsReps.push(
                <main className={classes.layout} key="b">
                    <main className={classes.layout_narrow}>
                        <Grid container justify="flex-start">
                            <Typography
                                id="weight"
                                style={{paddingLeft: 5}}
                                variant="caption"
                                color="primary"
                            >
                                Weight:
                            </Typography>
                        </Grid>
                    </main>

                    <Grid container justify="center">
                        <Remove
                            className={classes.iconColor}
                            style={{marginRight: 20}}
                            color="primary"
                            fontSize="large"
                            onClick={this.onReduceWeight}
                        />
                        <Input
                            className={classes.inputSize}
                            classes={{
                                input: classes.inputCenter,
                                underline: classes.underline
                            }}
                            style={{fontWeight: 580, fontSize: 20}}
                            value={this.state.weight}
                            name="weight"
                            readOnly={false}
                            error={!isEmpty(this.state.error.weight)}
                            // disableUnderline={true}
                            onChange={this.onChange}
                            // endAdornment={<InputAdornment position="end">&nbsp;kgs</InputAdornment>}
                        />
                        <Add
                            className={classes.iconColor}
                            style={{marginLeft: 20}}
                            color="primary"
                            fontSize="large"
                            onClick={this.onAddWeight}
                        />
                    </Grid>

                    {/*<br/>*/}

                    <main className={classes.layout_narrow}>
                        <Grid container justify="flex-start">
                            <Typography
                                style={{paddingLeft: 5}}
                                variant="caption"
                                color="primary"
                            >
                                Reps:
                            </Typography>
                        </Grid>
                    </main>

                    <Grid container justify="center">
                        <Remove
                            className={classes.iconColor}
                            color="primary"
                            fontSize="large"
                            style={{marginRight: 20}}
                            onClick={this.onReduceReps}
                        />

                        <Input
                            className={classes.inputSize}
                            classes={{
                                input: classes.inputCenter,
                                underline: classes.underline
                            }}
                            style={{fontWeight: 580, fontSize: 20}}
                            value={this.state.reps}
                            name="reps"
                            readOnly={false}
                            error={!isEmpty(this.state.error.reps)}
                            // disableUnderline={true}
                            onChange={this.onChange}
                            // endAdornment={<InputAdornment position="end">reps</InputAdornment>}
                        />

                        <Add
                            className={classes.iconColor}
                            style={{marginLeft: 20}}
                            color="primary"
                            fontSize="large"
                            onClick={this.onAddReps}
                        />
                    </Grid>

                    <Grid container justify="center">
                        <FormHelperText
                            error={!isEmpty(this.state.error.reps)}
                        >
                            {this.state.error.reps}
                        </FormHelperText>
                    </Grid>

                    <div style={{padding: 5}}></div>

                    <Grid container
                          justify="space-evenly"
                    >
                        <Button
                            style={{
                                width: 150,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                            size="small"
                            variant={"contained"}
                            color="primary"
                            onClick={this.state.index === '' ? this.onSave : this.onUpdate}
                        >
                            {save_update}
                        </Button>
                        <Button
                            style={{
                                width: 150,
                                marginTop: 10,
                                marginBottom: 10
                            }}
                            size="small"
                            variant={"contained"}
                            color={this.state.index === '' ? "inherit" : "secondary"}
                            onClick={this.state.index === '' ? this.onClear : this.onDelete}
                        >
                            {clear_delete}
                        </Button>
                    </Grid>

                    {/*<Divider*/}
                    {/*    className={classes.dividerColor}*/}
                    {/*/>*/}
                </main>
            );

            //Workout table
            workoutTable =
                <main className={classes.layout_narrow} key="c">
                    <Grid container justify="center">
                        <Table size="small">
                            <TableBody>
                                {this.state.workout.exercises[0].sets.map((sets_row, i) => {
                                    return (
                                        <TableRow
                                            classes={{selected: classes.selected}}
                                            className={classes.tableRow}
                                            hover
                                            selected={i === this.state.index}
                                            key={i}
                                        >
                                            <TableCell className={classes.noBorder}>
                                                <IconButton
                                                className={sets_row.comment.length === 0 ? classes.noteAddColorLight : classes.noteAddColorDark}
                                                style={{padding: 0}}
                                                onClick={this.onOpenDialog.bind(this, i)}
                                            >
                                                <NoteAdd/>
                                            </IconButton>
                                            </TableCell>
                                            <TableCell
                                                className={classes.noBorder}
                                                onClick={this.onClickRow.bind(this, i)}
                                                name="index"
                                            >
                                                {i + 1}
                                            </TableCell>
                                            <TableCell
                                                className={classes.kgRep}
                                                onClick={this.onClickRow.bind(this, i)}
                                                name="index"
                                                align="right">
                                                {(() => {
                                                    var num = parseFloat(sets_row.weight);
                                                    return num.toFixed(1);
                                                })()}
                                            </TableCell>
                                            <TableCell
                                                className={classes.kgsReps}
                                                // style={{fontSize:'0.75rem'}}
                                                onClick={this.onClickRow.bind(this, i)}
                                                name="index"
                                                align="right">
                                                kgs
                                            </TableCell>
                                            <TableCell
                                                className={classes.kgRep}
                                                onClick={this.onClickRow.bind(this, i)}
                                                name="index"
                                                align="right">
                                                {sets_row.reps}
                                            </TableCell>
                                            <TableCell
                                                className={classes.kgsReps}
                                                // style={{fontSize:'0.75rem'}}
                                                onClick={this.onClickRow.bind(this, i)}
                                                name="index"
                                                align="right">
                                                reps
                                            </TableCell>
                                            <TableCell className={classes.noBorder}>
                                                <IconButton
                                                    style={{padding: 0}}
                                                    color="primary"
                                                >
                                                    <Checkbox
                                                        className={classes.customCheckBox}
                                                        style={{padding: 0}}
                                                        onChange={this.onClickFinished.bind(this, i)}
                                                        value="finished"
                                                        checked={sets_row.finished}
                                                        color="primary"
                                                    >
                                                    </Checkbox>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        <Dialog
                            open={this.state.alertOpen}
                            onClose={this.onAlertClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Next Exercise"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Sets complete. Do you want to move on to the next exercise?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.onGo} color="primary" autoFocus>
                                    Go
                                </Button>
                                <Button onClick={this.onStay} color="primary">
                                    Stay
                                </Button>

                            </DialogActions>
                        </Dialog>


                        <Dialog open={this.state.dialogOpen}
                                onClose={this.onCloseDialog}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle
                                id="form-dialog-title">
                                Comment
                            </DialogTitle>
                            <DialogContent>
                                {/*<DialogContentText>*/}
                                {/*</DialogContentText>*/}
                                <TextField
                                    value={this.state.comment}
                                    onChange={this.onChange}
                                    autoFocus
                                    margin="dense"
                                    name="comment"
                                    label="Comment"
                                    type="text"
                                    fullWidth
                                    multiline={true}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    style={{
                                        width: 150,
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}
                                    size="small"
                                    variant={"contained"}
                                    color="primary"
                                    onClick={this.onSaveComment}
                                >
                                    {save_update_comment}
                                </Button>

                                <Button
                                    style={{
                                        width: 150,
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}
                                    size="small"
                                    variant={"contained"}
                                    color="inherit"
                                    onClick={this.state.add_comment ? this.onCloseDialog : this.onDeleteComment}
                                >
                                    {cancel_delete_comment}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </main>
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
                            {header}
                            {weightsReps}
                            {workoutTable}
                        </div>

                    )}
            </div>
        );
    }
}

Workout.propTypes = {
    updateWorkout: PropTypes.func.isRequired,
    startRestTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    workout: state.workout
});

export default connect(mapStateToProps, {updateWorkout, startRestTimer})(withStyles(styles)(Workout));
