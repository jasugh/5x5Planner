import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {Link as RouterLink} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {CardActions} from "@material-ui/core";

const styles = theme => ({
    card: {
        flexGrow: 1,
        maxWidth: 500,
        marginTop: 50
    },
    buttonJustify: {
        justifyContent: 'center',
    },
    buttonPadding: {
        margin: 20,
        width: 150
    },
});

class Landing extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    renderLink = React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <RouterLink to={this.props.to} {...itemProps} innerRef={ref}/>
    ));

    render() {
        const {classes} = this.props;

        return (
            <div className={"landing"}>
                <Grid container justify="center">
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid>
                                <Typography align={"center"} color="primary" variant="h6">
                                    5 x 5 Routine Planner
                                </Typography>
                            </Grid>
                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                component={this.renderLink} to="/register"
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                className={classes.buttonPadding}>
                                Sign Up
                            </Button>
                            <Button
                                component={this.renderLink} to="/login"
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                className={classes.buttonPadding}>
                                Login
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)((withStyles(styles))(Landing));
