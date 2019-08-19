import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';

import {getPlan, savePlan, deletePlan} from "../../actions/planActions";
import {createRoutine} from "../../actions/routineActions";

import isEmpty from "../../validation/is-empty";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({
    buttonJustify: {
        justifyContent: 'center',
    },
    buttonPadding: {
        marginLeft: 20,
        width: 200
    },
    buttonWidth: {
        width: 200
    },
    card: {
        flexGrow: 1,
        maxWidth: 500,
        padding: '5px'                     //padding inside card
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    kg: {
        width: 90,
        margin: 0,
        marginBottom: 10
    },
    reps: {
        width: 80,
        margin: 0,
        marginLeft: 40
    },
    maxGrid: {
        width: 500,
    },
    formControl: {
        margin: theme.spacing(2),
    },
    size: {
        width: 10,
        height: 10,
    },
    textPadding: {
        paddingTop: 10,
        fontWeight: 590
    },
    fontWeight: {
        fontWeight: 590
    },
    column: {
        flexBasis: '33.33%',
    },
    paddingLeft: {
        paddingLeft: 0
    },
});

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            plan_name: '',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            squat_max_kg: 0,
            squat_max_reps: 0,
            bench_max_kg: 0,
            bench_max_reps: 0,
            overhead_max_kg: 0,
            overhead_max_reps: 0,
            deadlift_max_kg: 0,
            deadlift_max_reps: 0,
            barbell_row_max_kg: 0,
            barbell_row_max_reps: 0,
            start_date: '',
            errors: {},
            position: 'beginner',
            stateInitialized: false,
        });

        this.onChange = this.onChange.bind(this);
        this.onSavePlan = this.onSavePlan.bind(this);
        this.onDeletePlan = this.onDeletePlan.bind(this);
        this.onCreateRoutine = this.onCreateRoutine.bind(this);
    };

    componentDidMount() {
        this.props.getPlan();
    };

    static getDerivedStateFromProps(props, state) {
        let dt = '';
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.plan.plan !== state.plan && !state.stateInitialized) {
            if (props.plan.plan.start_date) {
                let sd = new Date(props.plan.plan.start_date);

                let d = sd.getDate();
                if (d < 10) {
                    d = '0' + d;
                }

                let m = sd.getMonth() + 1;
                if (m < 10) {
                    m = '0' + m;
                }
                let y = sd.getFullYear();

                dt = y + '-' + m + '-' + d;
            }

            return {
                plan_name: props.plan.plan.plan_name,
                monday: props.plan.plan.monday,
                tuesday: props.plan.plan.tuesday,
                wednesday: props.plan.plan.wednesday,
                thursday: props.plan.plan.thursday,
                friday: props.plan.plan.friday,
                saturday: props.plan.plan.saturday,
                sunday: props.plan.plan.sunday,
                squat_max_kg: props.plan.plan.squat_max_kg,
                squat_max_reps: props.plan.plan.squat_max_reps,
                bench_max_kg: props.plan.plan.bench_max_kg,
                bench_max_reps: props.plan.plan.bench_max_reps,
                overhead_max_kg: props.plan.plan.overhead_max_kg,
                overhead_max_reps: props.plan.plan.overhead_max_reps,
                deadlift_max_kg: props.plan.plan.deadlift_max_kg,
                deadlift_max_reps: props.plan.plan.deadlift_max_reps,
                barbell_row_max_kg: props.plan.plan.barbell_row_max_kg,
                barbell_row_max_reps: props.plan.plan.barbell_row_max_reps,
                start_date: dt,
                stateInitialized: true
            };
        }

        return null;
    };

    onSavePlan(event) {
        const planData = {
            plan_name: this.state.plan_name,
            monday: this.state.monday,
            tuesday: this.state.tuesday,
            wednesday: this.state.wednesday,
            thursday: this.state.thursday,
            friday: this.state.friday,
            saturday: this.state.saturday,
            sunday: this.state.sunday,
            squat_max_kg: this.state.squat_max_kg,
            squat_max_reps: this.state.squat_max_reps,
            bench_max_kg: this.state.bench_max_kg,
            bench_max_reps: this.state.bench_max_reps,
            overhead_max_kg: this.state.overhead_max_kg,
            overhead_max_reps: this.state.overhead_max_reps,
            deadlift_max_kg: this.state.deadlift_max_kg,
            deadlift_max_reps: this.state.deadlift_max_reps,
            barbell_row_max_kg: this.state.barbell_row_max_kg,
            barbell_row_max_reps: this.state.barbell_row_max_reps,
            start_date: this.state.start_date
        };
        this.props.savePlan(planData, this.props.history);
    };

    onDeletePlan(event) {
        this.props.deletePlan(this.state.plan_name, this.props.history);
    };

    onCreateRoutine(event) {
        this.props.createRoutine(this.props.history);
    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    renderLink = React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <RouterLink to={this.props.to} {...itemProps} innerRef={ref}/>
    ));

    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        const {plan, loading} = this.props.plan;

        let button_text = 'add';
        let plan_exist = false;

        if (plan._id) {
            plan_exist = true;
            button_text = 'update'
        }

        let panelLines;

        if (!loading) {
            panelLines =
                <Grid container justify="center">
                    <Card className={classes.card} elevation={2}>
                        <CardContent>
                            <Typography align={"center"} color="primary" variant="h6">
                                Plan
                            </Typography>
                            <FormControl component="fieldset" className={classes.formControl}>
                                {/*<Typography*/}
                                {/*    align={"left"}*/}
                                {/*    color="primary"*/}
                                {/*    variant="subtitle1"*/}
                                {/*>*/}
                                {/*    Select 3 training week days*/}
                                {/*</Typography>*/}
                                {/*<FormGroup row>*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("monday")}*/}
                                {/*                checked={this.state.monday}*/}
                                {/*                value="monday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Mo"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("tuesday")}*/}
                                {/*                checked={this.state.tuesday}*/}
                                {/*                value="tuesday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Tu"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("wednesday")}*/}
                                {/*                checked={this.state.wednesday}*/}
                                {/*                value="wednesday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="We"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("thursday")}*/}
                                {/*                checked={this.state.thursday}*/}
                                {/*                value="thursday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Th"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("friday")}*/}
                                {/*                checked={this.state.friday}*/}
                                {/*                value="friday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Fr"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("saturday")}*/}
                                {/*                checked={this.state.saturday}*/}
                                {/*                value="saturday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Sa"*/}
                                {/*    />*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                onChange={this.onChecked("sunday")}*/}
                                {/*                checked={this.state.sunday}*/}
                                {/*                value="sunday"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.size}*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        labelPlacement={"top"}*/}
                                {/*        label="Su"*/}
                                {/*    />*/}
                                {/*    <FormHelperText*/}
                                {/*        error={!isEmpty(errors.workout_days)}*/}
                                {/*    >*/}
                                {/*        {errors.workout_days}*/}
                                {/*    </FormHelperText>*/}
                                {/*</FormGroup>*/}

                                <FormGroup>

                                    <Grid className={classes.maxGrid}>
                                        {/*<Grid container justify={"center"} className={classes.maxGrid}>*/}
                                        <div>
                                        <Typography
                                            className={classes.fontWeight}
                                            variant={"subtitle1"}
                                            align={"left"}
                                            color="primary"
                                        >
                                            Start date
                                        </Typography>
                                        <TextField
                                            value={this.state.start_date}
                                            error={!isEmpty(errors.start_date)}
                                            helperText={errors.start_date}
                                            name="start_date"
                                            onChange={this.onChange}
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        </div>

                                        <Typography
                                            className={classes.textPadding}
                                            align={"left"}
                                            color="primary"
                                            variant="subtitle1"
                                        >
                                            Current maximums
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            Squat
                                        </Typography>
                                        <TextField
                                            value={this.state.squat_max_kg}
                                            error={!isEmpty(errors.squat_max_kg)}
                                            helperText={errors.squat_max_kg}
                                            name="squat_max_kg"
                                            type="number"
                                            onChange={this.onChange}
                                            className={classes.kg}
                                            inputProps={{min: "1", max: "500", step: "0.5"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            value={this.state.squat_max_reps}
                                            error={!isEmpty(errors.squat_max_reps)}
                                            helperText={errors.squat_max_reps}
                                            name="squat_max_reps"
                                            type="number"
                                            onChange={this.onChange}
                                            className={classes.reps}
                                            inputProps={{min: "1", max: "20", step: "1"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            Bench
                                        </Typography>
                                        <TextField
                                            value={this.state.bench_max_kg}
                                            error={!isEmpty(errors.bench_max_kg)}
                                            helperText={errors.bench_max_kg}
                                            name="bench_max_kg"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.kg}
                                            inputProps={{min: "1", max: "500", step: "0.5"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            value={this.state.bench_max_reps}
                                            error={!isEmpty(errors.bench_max_reps)}
                                            helperText={errors.bench_max_reps}
                                            name="bench_max_reps"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.reps}
                                            inputProps={{min: "1", max: "20", step: "1"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            Overhead press
                                        </Typography>
                                        <TextField
                                            value={this.state.overhead_max_kg}
                                            error={!isEmpty(errors.overhead_max_kg)}
                                            helperText={errors.overhead_max_kg}
                                            name="overhead_max_kg"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.kg}
                                            inputProps={{min: "1", max: "500", step: "0.5"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            value={this.state.overhead_max_reps}
                                            error={!isEmpty(errors.overhead_max_reps)}
                                            helperText={errors.overhead_max_reps}
                                            name="overhead_max_reps"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.reps}
                                            inputProps={{min: "1", max: "20", step: "1"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            Deadlift
                                        </Typography>
                                        <TextField
                                            value={this.state.deadlift_max_kg}
                                            error={!isEmpty(errors.deadlift_max_kg)}
                                            helperText={errors.deadlift_max_kg}
                                            name="deadlift_max_kg"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.kg}
                                            inputProps={{min: "1", max: "500", step: "0.5"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            value={this.state.deadlift_max_reps}
                                            error={!isEmpty(errors.deadlift_max_reps)}
                                            helperText={errors.deadlift_max_reps}
                                            name="deadlift_max_reps"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.reps}
                                            inputProps={{min: "1", max: "20", step: "1"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                        >
                                            Barbel row
                                        </Typography>
                                        <TextField
                                            value={this.state.barbell_row_max_kg}
                                            error={!isEmpty(errors.barbell_row_max_kg)}
                                            helperText={errors.barbell_row_max_kg}
                                            name="barbell_row_max_kg"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.kg}
                                            inputProps={{min: "1", max: "500", step: "0.5"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            value={this.state.barbell_row_max_reps}
                                            error={!isEmpty(errors.barbell_row_max_reps)}
                                            helperText={errors.barbell_row_max_reps}
                                            name="barbell_row_max_reps"
                                            type="number"
                                            onChange={this.onChange}
                                            id="outlined-simple-start-adornment"
                                            className={classes.reps}
                                            inputProps={{min: "1", max: "20", step: "1"}}
                                            // eslint-disable-next-line
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                </FormGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSavePlan}
                                className={classes.buttonWidth}
                            >
                                {button_text}
                            </Button>
                            <Button
                                component={this.renderLink}
                                to="/"
                                size={"medium"}
                                variant={"contained"}
                                color="inherit"
                                onClick={this.onCancel}
                                className={classes.buttonPadding}
                            >
                                cancel
                            </Button>

                        </CardActions>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                disabled={!plan_exist}
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onCreateRoutine}
                                className={classes.buttonWidth}
                            >
                                create routine
                            </Button>
                            <Button
                                disabled={!plan_exist}
                                size={"medium"}
                                variant={"contained"}
                                color="secondary"
                                onClick={this.onDeletePlan}
                                className={classes.buttonPadding}
                            >
                                delete
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
                        <div>
                            {panelLines}
                        </div>
                    )}
            </div>
        );
    }
}

Plan.propTypes = {
    savePlan: PropTypes.func.isRequired,
    getPlan: PropTypes.func.isRequired,
    deletePlan: PropTypes.func.isRequired,
    createRoutine: PropTypes.func.isRequired,
    plan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    plan: state.plan,
    errors: state.errors
});

export default connect(mapStateToProps, {savePlan, getPlan, deletePlan, createRoutine})(withStyles(styles)(Plan));
