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
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from "@material-ui/core/InputAdornment";

import {getSettings, saveSettings} from "../../actions/settingActions";
import isEmpty from "../../validation/is-empty";

const styles = theme => ({
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
        [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

class Settings extends Component {
    constructor() {
        super();
        this.state = ({
            dateFormat: '',
            restTime: 0,
            weightIncrement: 0,

            errors: {},
            settings: {},
        });

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.props.getSettings();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.settings.settings !== state.settings) {
            return {
                dateFormat: props.settings.settings.dateFormat,
                restTime: props.settings.settings.restTime,
                weightIncrement: props.settings.settings.weightIncrement,
                settings: props.settings.settings,
            };
        }
        return null;
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSave(event) {
        const settingsData = {
            dateFormat: this.state.dateFormat,
            restTime: this.state.restTime,
            weightIncrement: this.state.weightIncrement
        };

        this.props.saveSettings(settingsData);
    }

    onCancel() {
        this.props.history.push('/dashboard');
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        const {settings, loading} = this.props.settings;

        let button_text = '';
        settings._id ? button_text = 'update' : button_text = 'add';

        let panelLines;

        if (!loading) {
            panelLines =
                <Grid container justify="center">
                    <Card className={classes.card} elevation={2}>
                        <CardContent>
                            <Typography align={"center"} color="primary" variant="h6">
                                Settings
                            </Typography>

                            {/* Default Rest Time */}
                            <Typography
                                style={{paddingTop: 10}}
                                variant="subtitle2"
                                color="primary"
                            >
                                Default Rest Time:
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

                            <br/>
                            <br/>

                            {/* Default Weight Increment */}
                            <Typography
                                // style={{paddingLeft: 5}}
                                variant="subtitle2"
                                color="primary"
                            >
                                Default Weight Increment:
                            </Typography>
                            <TextField
                                style={{width: 100}}
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

                            <br/>
                            <br/>

                            {/* Date Fromat */}
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Date Format:
                            </Typography>
                            <Select
                                native
                                value={this.state.dateFormat}
                                error={!isEmpty(errors.dateFormat)}
                                onChange={this.onChange}
                                name="dateFormat"
                            >
                                <option value={''}>Select date format...</option>
                                <option value={'YYYY-MM-DD'}>YYYY-MM-DD</option>
                                <option value={'DD-MM-YYYY'}>DD-MM-YYYY</option>
                                <option value={'YYYY.MM.DD'}>YYYY.MM.DD</option>
                                <option value={'DD.MM.YYYY'}>DD.MM.YYYY</option>
                            </Select>
                            <FormHelperText
                                style={{
                                    color: "red",
                                    // paddingBottom: 5
                                }}
                            >
                                {(() => {
                                    switch (!isEmpty(errors.dateFormat)) {
                                        case false:
                                            return "";
                                        case true:
                                            return errors.dateFormat;
                                        default:
                                            return "";
                                    }
                                })()}
                            </FormHelperText>

                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSave}
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

Settings.propTypes = {
    getSettings: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    settings: state.settings,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getSettings,
    saveSettings,
})(withStyles(styles)(Settings));
