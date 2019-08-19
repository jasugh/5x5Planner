import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import {registerUser} from "../../actions/authActions";
import isEmpty from "../../validation/is-empty";

const styles = theme => ({
    card: {
        flexGrow: 1,
    },
    buttonJustify: {
        justifyContent: 'center',
    },
    buttonPadding: {
        margin: 20,
        width: 150
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

class Register extends Component {
    constructor() {
        super();
        this.state = ({
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        });
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;

        return (
            <main className={classes.layout}>
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid>
                                <Typography align={"center"} color="primary" variant="h6">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                onChange={this.onChange}
                                error={!isEmpty(errors.name)}
                                helperText={errors.name}
                                value={this.state.name}
                            />
                            <TextField
                                name="email"
                                label="Email Address"
                                fullWidth
                                onChange={this.onChange}
                                error={!isEmpty(errors.email)}
                                helperText={errors.email}
                                value={this.state.email}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                onChange={this.onChange}
                                error={!isEmpty(errors.password)}
                                helperText={errors.password}
                                value={this.state.password}
                            />
                            <TextField
                                label="Confirm Password"
                                name="password2"
                                type="password"
                                fullWidth
                                onChange={this.onChange}
                                error={!isEmpty(errors.password2)}
                                helperText={errors.password2}
                                value={this.state.password2}
                            />
                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSubmit}
                                className={classes.buttonPadding}>
                                sign up
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </main>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(withRouter(Register)));
