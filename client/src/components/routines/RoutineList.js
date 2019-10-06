import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as moment from 'moment';

import {getRoutine} from '../../actions/routineActions';
import Typography from "@material-ui/core/Typography";

const DATE_FORMAT = 'YYYY-MM-DD';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    buttonJustify: {
        margin: 20,
        width: 150
    },
    head: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 55
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class RoutineList extends Component {

    componentDidMount() {
        this.props.getRoutine();
    }

    render() {
        const {classes} = this.props;
        const {routine, routine_loading} = this.props.routine;

        let panelLines;

        if (!routine_loading && !routine.workouts) {
            panelLines =
                <Grid container className={classes.root} justify="center">
                    <Typography align={"center"} color="primary" variant="h6">
                        No Routine data found.
                    </Typography>
                </Grid>
        }

        if (!routine_loading && routine.workouts) {
            panelLines =
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={classes.head}>Week</TableCell>
                                <TableCell
                                    className={classes.head}>Date</TableCell>
                                <TableCell
                                    className={classes.head}>Exercise 1</TableCell>
                                <TableCell
                                    className={classes.head}>Kg</TableCell>
                                <TableCell
                                    className={classes.head}>Reps</TableCell>
                                <TableCell
                                    className={classes.head}>Exercise 2</TableCell>
                                <TableCell
                                    className={classes.head}>Kg</TableCell>
                                <TableCell
                                    className={classes.head}>Reps</TableCell>
                                <TableCell
                                    className={classes.head}>Exercise 3</TableCell>
                                <TableCell
                                    className={classes.head}>Kg</TableCell>
                                <TableCell
                                    className={classes.head}>Reps</TableCell>
                                <TableCell
                                    className={classes.head}>Finished</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {routine.workouts.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        className={classes.row}
                                        key={index}
                                    >
                                        <TableCell>{row.week}</TableCell>
                                        <TableCell>{moment(row.date).format(DATE_FORMAT)}</TableCell>
                                        <TableCell>{row.exercise1}</TableCell>
                                        <TableCell>{row.exercise1_kg}</TableCell>
                                        <TableCell>{row.exercise1_reps}</TableCell>
                                        <TableCell>{row.exercise2}</TableCell>
                                        <TableCell>{row.exercise2_kg}</TableCell>
                                        <TableCell>{row.exercise2_reps}</TableCell>
                                        <TableCell>{row.exercise3}</TableCell>
                                        <TableCell>{row.exercise3_kg}</TableCell>
                                        <TableCell>{row.exercise3_reps}</TableCell>
                                        <TableCell>
                                            {(() => {
                                                switch (row.finished) {
                                                    case true:
                                                        return "X";
                                                    case false:
                                                        return "-";
                                                    default:
                                                        return "";
                                                }
                                            })()}
                                        </TableCell>

                                        {/*{row.add_exercises.map((row, index) => {*/}
                                        {/*    return (*/}
                                        {/*        <TableRow>*/}
                                        {/*            <TableCell>*/}
                                        {/*                {row.add_exercise}*/}
                                        {/*            </TableCell>*/}
                                        {/*        </TableRow>*/}
                                        {/*    )*/}
                                        {/*})}*/}

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
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
                        <div>
                            {panelLines}
                        </div>
                    )}
            </div>
        );
    }
}

RoutineList.propTypes = {
    getRoutine: PropTypes.func.isRequired,
    routine: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    routine: state.routine,
});

export default connect(mapStateToProps, {getRoutine})(withStyles(styles)(RoutineList));