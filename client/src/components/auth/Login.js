import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from "../../actions/authActions";

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

class Login extends Component {
    constructor() {
        super();
        this.state = ({
            name: '',
            password: '',
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        const userData = {
            name: this.state.name,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;

        return (
            <main className={classes.layout}>
                <Grid container justify="center">
                    <Card className={classes.card} elevation={2}>
                        <CardContent>
                            <Grid>
                                <Typography align={"center"} color="primary" variant="h6">
                                    Log In
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
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                onChange={this.onChange}
                                error={!isEmpty(errors.password)}
                                helperText={errors.password}
                                value={this.state.password}
                            />
                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                className={classes.buttonPadding}
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSubmit}
                            >
                                login
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </main>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login));
