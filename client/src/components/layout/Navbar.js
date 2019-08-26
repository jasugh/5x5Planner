import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {logoutUser} from "../../actions/authActions";
import {Link as RouterLink} from 'react-router-dom';

import Alarm from '@material-ui/icons/Alarm';
import Tooltip from '@material-ui/core/Tooltip';
import soundfile from "../workout/Twin-bell-alarm-clock.mp3";
import {Grid} from "@material-ui/core";

import {stopRestTimer} from '../../actions/restTimerActions';
import LinearProgress from "@material-ui/core/LinearProgress";

const drawerWidth = 200;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paddingBottom: {
        paddingBottom: 80
    },
    paddingTop: {
        paddingTop: 80
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%"
        },
        zIndex: theme.zIndex.drawer + 1,
        overflow: "hidden"
    },
    rightToolbar: {
        width: 150,
    },
    bar1Determinate: {
        background: theme.palette.secondary.main,
        // background: "linear-gradient(to left, #f44336, #607d8b)",
    },
    linearPadding: {
        marginTop: 64,
        [theme.breakpoints.down("sm")]: {
            marginTop: 56
        }
    }
});

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            open_list: false,
            variant: 'persistent',

            //Timer
            isOn: false,
            ready: false,
            time: 10000,
            restTime: 10000,
            progressTime: 0,
            completed: 0,
        };
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.restTimer.start_rest_timer) {
            this.startTimer();
            this.props.stopRestTimer();
        }

    }

    // Start timer
    startTimer(event) {
        this.setState({
            isOn: true,
            ready: false,
            time: 10000,
            restTime: 10000,
            progressTime: 0,
            completed: 0,
        });

        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {

            this.setState({
                time: this.state.time - 1000,
                progressTime: this.state.progressTime + 1000
            });

            this.progress();

            if (this.state.time <= 0) {
                clearInterval(this.timer);
                this.setState({ready: true, isOn: false, completed: 0});

                //Check if all exercises are finished if yes -> go back
                // let s = this.state.workout.exercises[0].sets;
                // let f = s.filter(f => f.finished === true).length;
                //
                // if (f === s.length) {
                //     this.props.updateWorkout(this.state.workout, this.props.history);
                //
                //     // this.props.history.push('/routine/calendar');
                // }
            }
        }, 1000)
    };

    progress = () => {
        if (this.state.completed >= 100) {
            this.setState({completed: 0});
        } else {
            this.setState({completed: (this.state.progressTime / this.state.restTime) * 100});
        }
    };


    onSetDrawerOpen = () => {
        this.setState({open: !this.state.open});
    };

    onSetOpenList = () => {
        this.setState(state => ({open_list: !state.open_list}));
    };

    onLogoutClick(event) {
        event.preventDefault();
        this.props.logoutUser();
    }

    renderLink = React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <RouterLink to={this.props.to} {...itemProps} innerRef={ref}/>
    ));

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {classes} = this.props;
        const {open} = this.state;
        // const {start_rest_timer} = this.props.restTimer;

        const authLinks = (
            <div style={{display: "flex"}}>
                <Typography noWrap>
                    <Tooltip title={"You are logged in as: " + user.name}>
                        <Button
                            color="inherit"
                            onClick={this.onLogoutClick.bind(this)}>
                            Logout
                        </Button>
                    </Tooltip>
                </Typography>
            </div>
        );

        const guestLinks = (
            <div style={{display: "flex"}}>
                <Typography noWrap>
                    <Button
                        component={this.renderLink}
                        to="/register"
                        color="inherit">
                        Sign Up
                    </Button>
                    <Button
                        component={this.renderLink}
                        to="/login"
                        color="inherit">
                        Login
                    </Button>
                </Typography>
            </div>
        );

        //Rest timer
        let restTimer;

        if (isAuthenticated) {
            //TODO: in some cases state.ready is left true and when logged in alarm sound is played
            if (this.state.ready) {
                restTimer =
                    <div style={{paddingTop: 5}}>
                        <Alarm
                            className={classes.height}
                            color="inherit"
                        />
                        <div>
                            <audio
                                ref="audio-tag"
                                src={soundfile}
                                controls={false}
                                autoPlay
                            />
                        </div>
                    </div>
            } else {
                if (this.state.isOn) {
                    restTimer =
                        <div className={classes.paddingBottom}>
                            <Typography
                                color="inherit"
                                variant="h5"
                            >
                                {this.state.time / 1000}
                            </Typography>
                        </div>
                } else {
                    restTimer =
                        <div style={{paddingTop: 5}}>
                            <Alarm
                                color="inherit"
                            />
                        </div>
                }
            }
        }

        return (
            <div style={{paddingBottom: 20}}>
                <div>
                    <AppBar
                        className={classes.appBar}
                        position="fixed">
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.onSetDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                5X5
                            </Typography>

                            <Grid container style={{height: 32}} justify="center">
                                {restTimer}
                            </Grid>

                            {isAuthenticated ? authLinks : guestLinks}
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        className={classes.drawer}
                        variant={this.state.variant}
                        anchor={"left"}
                        open={this.state.open}
                        onClose={() => this.onSetOpenList(this.state.open)}
                    >
                        <List className={classes.paddingTop}>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/setting"
                            >
                                <ListItemText primary={"Settings"}/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/category"
                            >
                                <ListItemText primary={"Categories"}/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/exercise"
                            >
                                <ListItemText primary={"Exercises"}/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/routineexercise"
                            >
                                <ListItemText primary="Routine Exercises"/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/plan"
                            >
                                <ListItemText primary={"Routine Plan"}/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/routine/list"
                            >
                                <ListItemText primary="Routine List"/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/routine/update"
                            >
                                <ListItemText primary="Routine Update"/>
                            </ListItem>

                            <ListItem
                                button
                                onClick={() => this.onSetDrawerOpen(this.state.open)}
                                component={this.renderLink}
                                to="/workout/calendar"

                            >
                                <ListItemText primary="Workout Calendar"/>
                            </ListItem>

                        </List>
                    </Drawer>


                </div>
                <div>
                    <LinearProgress
                        className={classes.linearPadding}
                        classes={{
                            bar1Determinate: classes.bar1Determinate,
                        }}
                        style={{height: 4}}
                        variant="determinate"
                        value={this.state.completed}
                    />
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    stopRestTimer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    restTimer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    restTimer: state.restTimer,
});

export default connect(mapStateToProps, {logoutUser, stopRestTimer})(withStyles(styles, {withTheme: true})(Navbar));
