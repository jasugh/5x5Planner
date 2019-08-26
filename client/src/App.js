import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {deepOrange} from "@material-ui/core/colors";
import blueGrey from '@material-ui/core/colors/blueGrey';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from "./components/layout/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import './App.css';
import {logoutUser, setCurrentUser} from "./actions/authActions";

import Setting from "./components/settings/Settings";
import Category from "./components/basicData/Category";
import Exercise from "./components/basicData/Exercise";
import RoutineExercise from "./components/exercise/Exercise";
import RoutinePlan from './components/routines/RoutinePlan';
import RoutineList from './components/routines/RoutineList';
import RoutineTable from "./components/routines/RoutineTable";
import WorkoutCalendar from "./components/workout/WorkoutCalendar";
import Workout from "./components/workout/Workout";

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,      //#607d8b, rgba(96, 125, 139, 1)
        secondary: deepOrange,
    },
    overrides: {
        MuiBox: {
            root: {
                paddingTop: 20,
                paddingLeft: 0,
            }
        }
    },

    // blue 2196f3
    // bluegrey = blueGrey

    // palette: {
    //     primary: {
    //         light: '#fff',
    //         main: '#2196F3',
    //         dark: '#1565c0'
    //     },
    // },
    // typography: {
    //     useNextVariants: true
    // }

    // overrides: {
    //     MuiDivider: {
    //         root: {
    //             marginTop: 6,
    //             height: 2,
    //             backgroundColor: '#607d8b',
    //         },
    //     },
    // },
});


// Check for token
if (localStorage.jwtToken) {
    // Set auth token to header auth
    setAuthToken(localStorage.jwtToken);
    // Decode the token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current Profile

        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <Navbar/>
                            <Route exact path="/" component={Landing}/>
                            <div className="container">
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/login" component={Login}/>
                                <Switch>
                                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                    <PrivateRoute exact path="/setting" component={Setting}/>
                                    <PrivateRoute exact path="/exercise" component={Exercise}/>
                                    <PrivateRoute exact path="/category" component={Category}/>
                                    <PrivateRoute exact path="/plan" component={RoutinePlan}/>
                                    <PrivateRoute exact path="/routineexercise" component={RoutineExercise}/>
                                    <PrivateRoute exact path="/routine/list" component={RoutineList}/>
                                    <PrivateRoute exact path="/routine/update" component={RoutineTable}/>
                                    <PrivateRoute exact path="/workout/calendar" component={WorkoutCalendar}/>
                                    <PrivateRoute exact path="/workout" component={Workout}/>
                                </Switch>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
