import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import isEmpty from "../../validation/is-empty";

import {getAllCategory} from "../../actions/categoryActions";
import {
    getExercise,
    getAllExercise,
    saveExercise,
    updateExercise,
    deleteExercise,
    clearErrors
} from "../../actions/exerciseActions";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    buttonPadding: {
        margin: 5,
        width: 110,
        [theme.breakpoints.down("sm")]: {
            margin: 5,
            width: 100,
        }
    },
    typography: {
        paddingTop: 10,
        paddingLeft: 25,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        // color: theme.palette.primary.main,
        background: theme.palette.primary.A100,
    },
    fab: {
        position: 'fixed',
        top: theme.spacing(10),
        right: theme.spacing(2),
    },
});

class Exercise extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            errors: {},
            showAdd: false,
            id: '',
            open: [],

            name: '',
            category: '',
            restTime: 0,
            weightIncrement: 0,
            notes: '',
        });

        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCategoryListClick = this.onCategoryListClick.bind(this);
        this.onExerciseListClick = this.onExerciseListClick.bind(this);
    }

    componentDidMount() {
        this.props.getAllCategory();
        this.props.getAllExercise();
    };

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        return null;
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    onAdd() {
        this.setState({
            showAdd: true,
            name: '',
            category: '',
            restTime: 0,
            weightIncrement: 0,
            notes: '',
        })
    }

    onSave() {
        if (this.state.id) {
            const exerciseData = {
                id: this.state.id,
                name: this.state.name,
                category: this.state.category,
                restTime: this.state.restTime,
                weightIncrement: this.state.weightIncrement,
                notes: this.state.notes,
            };
            this.props.updateExercise(exerciseData);
        } else {
            const exerciseData = {
                name: this.state.name,
                category: this.state.category,
                restTime: this.state.restTime,
                weightIncrement: this.state.weightIncrement,
                notes: this.state.notes,
            };
            this.props.saveExercise(exerciseData);
        }

        this.setState({
            showAdd: false,
            selectedIndex: '',
        });
    }

    onDelete() {
        const exerciseData = {
            id: this.state.id,
        };
        this.props.deleteExercise(exerciseData);

        this.setState({
            id: '',
            showAdd: false,
            selectedIndex: '',
        });
    }

    onCancel() {
        this.props.clearErrors();

        this.setState({
            id: '',
            name: '',
            category: '',
            restTime: 0,
            weightIncrement: 0,
            selectedIndex: '',
            notes: '',
            showAdd: false
        });
    }

    onCategoryListClick(event, index) {
        let o = this.state.open;
        o[index] = !this.state.open[index];

        this.setState({open: o});
    }

    onExerciseListClick(event, index) {
        if (index === this.state.selectedIndex) {
            this.setState({
                selectedIndex: '',
                id: '',
                name: '',
                showAdd: false
            });
        } else {
            this.setState({
                selectedIndex: index,
                id: this.props.exercise.exercises[index]._id,
                name: this.props.exercise.exercises[index].name,
                category: this.props.exercise.exercises[index].category,
                restTime: this.props.exercise.exercises[index].restTime,
                weightIncrement: this.props.exercise.exercises[index].weightIncrement,
                notes: this.props.exercise.exercises[index].notes,

                showAdd: true
            });
        }
    }


    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        const {category} = this.props.category;
        const {exercises} = this.props.exercise;
        const category_loading = this.props.category.loading;
        const exercise_loading = this.props.exercise.loading;

        let button_text = 'add';
        if (this.state.id) {
            button_text = 'update';
        }

        let exerciseView = [];

        if (!category_loading && !exercise_loading) {
            exerciseView.push(
                <div key={"a"}>
                    <Grid container justify="center">
                        <Typography
                            style={{paddingTop: 10}}
                            align={"center"}
                            color="primary"
                            variant="h6"
                        >
                            Exercises
                        </Typography>

                        <Fab
                            className={classes.fab}
                            style={{position: 'fixed'}}
                            color="primary"
                            aria-label="add"
                            onClick={this.onAdd}
                            disabled={this.state.showAdd}
                        >
                            <Tooltip title={"Add new exercise"}>
                                <AddIcon
                                    color="inherit"
                                />
                            </Tooltip>
                        </Fab>
                    </Grid>
                </div>
            );

            if (this.state.showAdd || errors.name) {
                exerciseView.push(
                    <Grid container justify="center" key={"b"}>
                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Exercise:
                            </Typography>
                            <TextField
                                value={this.state.name}
                                id="name"
                                error={!isEmpty(errors.name)}
                                helperText={errors.name}
                                name="name"
                                fullWidth
                                onChange={this.onChange}
                            />
                        </Grid>

                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Category:
                            </Typography>

                            <Select
                                native
                                fullWidth
                                value={this.state.category}
                                error={!isEmpty(errors.category)}
                                onChange={this.onChange}
                                name="category"

                            >
                                <option value="">
                                    Select category...
                                </option>
                                {category.map((row, index) => {
                                    return (
                                        <option key={row.name} value={row.name}>
                                            {row.name}
                                        </option>
                                    )
                                })}
                            </Select>

                        </Grid>

                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Rest Time:
                            </Typography>
                            <TextField
                                style={{width: 100}}
                                value={this.state.restTime}
                                error={!isEmpty(errors.restTime)}
                                helperText={errors.restTime}
                                name="restTime"
                                type="number"
                                onChange={this.onChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                                    inputProps: {
                                        min: "1",
                                        max: "36000",
                                        step: "1",
                                    }
                                }}
                            />
                        </Grid>

                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                // style={{paddingLeft: 5}}
                                variant="subtitle2"
                                color="primary"
                            >
                                Weight Increment:
                            </Typography>
                            <TextField
                                style={{width: 90}}
                                value={this.state.weightIncrement}
                                error={!isEmpty(errors.weightIncrement)}
                                helperText={errors.weightIncrement}
                                name="weightIncrement"
                                type="number"
                                onChange={this.onChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    inputProps: {
                                        min: "0.5",
                                        max: "20",
                                        step: "0.5"
                                    }
                                }}
                            />
                        </Grid>

                        <Grid style={{paddingTop: 20}} item xs={12}>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Notes:
                            </Typography>
                            <TextField
                                value={this.state.notes}
                                id="notes"
                                name="notes"
                                fullWidth
                                onChange={this.onChange}
                            />
                        </Grid>

                        <Grid style={{paddingTop: 40}} container justify="space-between">
                            <Button
                                className={classes.buttonPadding}
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSave}
                            >
                                {button_text}
                            </Button>
                            <Button
                                className={classes.buttonPadding}
                                disabled={!this.state.id}
                                size={"medium"}
                                variant={"contained"}
                                color="secondary"
                                onClick={this.onDelete}
                            >
                                delete
                            </Button>
                            <Button
                                className={classes.buttonPadding}
                                size={"medium"}
                                variant={"contained"}
                                color="inherit"
                                onClick={this.onCancel}
                            >
                                cancel
                            </Button>
                        </Grid>
                    </Grid>
                )
            } else {

                exerciseView.push(
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"c"}>

                        {category.map((category_row, i) => {

                                let collapseLines = [];
                                collapseLines.push(
                                    <List component="nav" key={"c" + i}>
                                        {exercises.map((exercise_row, ii) => {
                                            if (exercise_row.category === category_row.name) {
                                                return (
                                                    <div key={ii}>
                                                        <ListItem
                                                            divider
                                                            className={classes.nested}
                                                            key={ii}
                                                            index={ii}
                                                            button
                                                            onClick={event => this.onExerciseListClick(event, ii)}
                                                        >
                                                            <ListItemText primary={exercise_row.name}/>
                                                        </ListItem>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                        }
                                    </List>
                                );

                                return (
                                    <div key={i}>
                                        <ListItem
                                            divider
                                            key={i}
                                            index={i}
                                            button
                                            selected={this.state.selectedIndex === i}
                                            onClick={event => this.onCategoryListClick(event, i)}
                                        >
                                            <ListItemText primary={category_row.name}/>
                                            {this.state.open[i] ? <ExpandLess/> : <ExpandMore/>}
                                        </ListItem>
                                        <Collapse in={this.state.open[i]} timeout="auto" unmountOnExit>
                                            {collapseLines}
                                        </Collapse>
                                    </div>
                                )
                            }
                        )}
                    </List>
                )
            }
        }

        return (

            <div>
                {category_loading || exercise_loading ? (
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
        )
    }
}

Exercise.propTypes = {
    getAllCategory: PropTypes.func.isRequired,
    getExercise: PropTypes.func.isRequired,
    getAllExercise: PropTypes.func.isRequired,
    saveExercise: PropTypes.func.isRequired,
    updateExercise: PropTypes.func.isRequired,
    deleteExercise: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    category: state.category,
    exercise: state.exercise,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getAllCategory,
    getExercise,
    getAllExercise,
    saveExercise,
    updateExercise,
    deleteExercise,
    clearErrors,
})(withStyles(styles)(Exercise));
