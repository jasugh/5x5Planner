import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from "@material-ui/core/CircularProgress";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';

import {getRoutineDay, saveRoutineDay} from '../../actions/routineDayActions';
import isEmpty from "../../validation/is-empty";
// import Checkbox from "@material-ui/core/Checkbox";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        flexGrow: 1,
    },
    buttonJustify: {
        justifyContent: 'center',
    },
    buttonPadding: {
        margin: 10,
        width: 200
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

            // routineDay.exercise11 = !isEmpty(routineDay.exercise11) ? routineDay.exercise11 : 'Squat';
            // routineDay.exercise12 = !isEmpty(routineDay.exercise12) ? routineDay.exercise12 : 'Bench Press';
            // routineDay.exercise13 = !isEmpty(routineDay.exercise13) ? routineDay.exercise13 : 'Barbell Row';
            // routineDay.exercise21 = !isEmpty(routineDay.exercise21) ? routineDay.exercise21 : 'Squat';
            // routineDay.exercise22 = !isEmpty(routineDay.exercise22) ? routineDay.exercise22 : 'Overhead Press';
            // routineDay.exercise23 = !isEmpty(routineDay.exercise23) ? routineDay.exercise23 : 'Deadlift';

            routineDay.exercise11 = !isEmpty(routineDay.exercise11) ? routineDay.exercise11 : '';
            routineDay.exercise12 = !isEmpty(routineDay.exercise12) ? routineDay.exercise12 : '';
            routineDay.exercise13 = !isEmpty(routineDay.exercise13) ? routineDay.exercise13 : '';
            routineDay.exercise21 = !isEmpty(routineDay.exercise21) ? routineDay.exercise21 : '';
            routineDay.exercise22 = !isEmpty(routineDay.exercise22) ? routineDay.exercise22 : '';
            routineDay.exercise23 = !isEmpty(routineDay.exercise23) ? routineDay.exercise23 : '';
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
        this.setState({ value: value });
    };

    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        const {routineDay, loading} = this.props.routineDay;

        const {value} = this.state;

        let button_text = '';
        routineDay._id ? button_text = 'update' : button_text = 'add';

        let panelLines;
        let tabLines = [];

        if (!loading) {
            panelLines =
                <Grid container justify="center">
                    <Card className={classes.card} elevation={2}>
                        <CardContent>
                            <Typography align={"center"} color="primary" variant="h6">
                                Workout A
                            </Typography>
                            <TextField
                                required
                                value={this.state.exercise11}
                                error={!isEmpty(errors.exercise11)}
                                helperText={errors.exercise11}
                                label="Exercise 1"
                                name="exercise11"
                                fullWidth
                                onChange={this.onChange}
                            />
                            <TextField
                                required
                                value={this.state.exercise12}
                                error={!isEmpty(errors.exercise12)}
                                helperText={errors.exercise12}
                                label="Exercise 2"
                                name="exercise12"
                                fullWidth
                                onChange={this.onChange}
                            />
                            <TextField
                                required
                                value={this.state.exercise13}
                                error={!isEmpty(errors.exercise13)}
                                helperText={errors.exercise13}
                                label="Exercise 3"
                                name="exercise13"
                                fullWidth
                                onChange={this.onChange}
                            />

                            {/*<Divider className={classes.divider}/>*/}

                            <Typography className={classes.divider}
                                        align={"center"} color="primary" variant="h6">
                                Workout B
                            </Typography>

                            <TextField
                                required
                                value={this.state.exercise11}
                                error={!isEmpty(errors.exercise21)}
                                helperText={errors.exercise21}
                                label="Exercise 1"
                                name="exercise11"
                                fullWidth
                                onChange={this.onChange}
                            />
                            <TextField
                                required
                                value={this.state.exercise22}
                                error={!isEmpty(errors.exercise22)}
                                helperText={errors.exercise22}
                                label="Exercise 2"
                                name="exercise22"
                                fullWidth
                                onChange={this.onChange}
                            />
                            <TextField
                                required
                                value={this.state.exercise23}
                                error={!isEmpty(errors.exercise23)}
                                helperText={errors.exercise23}
                                label="Exercise 3"
                                name="exercise23"
                                fullWidth
                                onChange={this.onChange}
                            />

                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
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
                        </CardActions>
                    </Card>
                </Grid>

            tabLines.push(

                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            name="value"
                            id="value"
                            onChange={this.handleChange}
                            aria-label="wrapped label tabs example">
                            <Tab
                                value="one"
                                label="Workout A B"
                                wrapped
                                {...a11yProps('one')}
                            />
                            <Tab
                                value="two"
                                label="Additional A B"
                                wrapped
                                {...a11yProps('two')} />
                            <Tab
                                value="three"
                                label="Additional by days"
                                wrapped
                                {...a11yProps('three')} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index="one">
                        {panelLines}
                    </TabPanel>
                    <TabPanel value={value} index="two">
                        Additional exercises for workout A and B.
                    </TabPanel>
                    <TabPanel value={value} index="three">
                        Additional exercises on certain week days.
                    </TabPanel>
                </div>


            )
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
                            {panelLines}
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