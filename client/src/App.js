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
import Login from "./components/auth/Login";

import './App.css';
import {logoutUser, setCurrentUser} from "./actions/authActions";

// import Setting from "./components/settings/Settings";
import Category from "./components/basicData/Category";
import Exercise from "./components/basicData/Exercise";
import RoutinePlan from './components/exercise/RoutinePlan';
import RoutineList from './components/routines/RoutineList';
import RoutineTable2 from "./components/routines/RoutineTable2";
import WorkoutCalendar from "./components/workout/WorkoutCalendar";
import Workout from "./components/workout/Workout";
import Exercise5x5 from "./components/exercise/Exercise5x5";
// import RoutineCreate from "./components/routines/RoutineCreate";
import ReadMe from "./components/layout/ReadMe";
import Instructions from "./components/layout/Instructions";
// import AdditionalExercise from "./components/exercise/AdditionalExercise";
import ExerciseForAB from "./components/exercise/ExerciseForAB";
import ExerciseByDay from "./components/exercise/ExerciseByDay";

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
        },
        // PrivateTabIndicator: {
        //     root: {
        //         width: '50%',
        //     }
        // },
    }
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
                                <Route exact path="/login" component={Login}/>
                                <Switch>
                                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>

                                    <PrivateRoute exact path="/readme" component={ReadMe}/>
                                    <PrivateRoute exact path="/instructions" component={Instructions}/>
                                    {/*Basic Date*/}
                                    {/*<PrivateRoute exact path="/setting" component={Setting}/>*/}
                                    <PrivateRoute exact path="/category" component={Category}/>
                                    <PrivateRoute exact path="/exercise" component={Exercise}/>

                                    {/*5x5 exercise and plan*/}
                                    <PrivateRoute exact path="/exercise5x5" component={Exercise5x5}/>
                                    <PrivateRoute exact path="/plan" component={RoutinePlan}/>
                                    {/*<PrivateRoute exact path="/additionalexercise" component={AdditionalExercise}/>*/}
                                    <PrivateRoute exact path="/exerciseforab" component={ExerciseForAB}/>
                                    <PrivateRoute exact path="/exercisebyday" component={ExerciseByDay}/>

                                    {/*Routine create, update*/}
                                    {/*<PrivateRoute exact path="/routine/create" component={RoutineCreate}/>*/}
                                    <PrivateRoute exact path="/routine/list" component={RoutineList}/>
                                    <PrivateRoute exact path="/routine/update" component={RoutineTable2}/>
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
