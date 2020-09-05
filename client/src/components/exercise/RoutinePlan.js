import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import * as moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CardHeader} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import {getRoutineDay} from '../../actions/routineDayActions';
import {getPlan, savePlan, deletePlan} from "../../actions/planActions";
import {createRoutineBeginner, createRoutineExperienced, createRoutineFixed} from "../../actions/routineActions";

import isEmpty from "../../validation/is-empty";
import Divider from '@material-ui/core/Divider';

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
        // flexGrow: 1,
        maxWidth: 500,
        padding: '5px'                     //padding inside card
    },
    grid: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    header: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        fontWeight: 500
    },
    kg: {
        width: 100,
        marginLeft: 20,
        marginBottom: 10
    },
    reps: {
        width: 100,
        margin: 0,
        marginLeft: 40
    },
    size: {
        width: 10,
        height: 10,
    },
    radioGroup: {
        paddingTop: 5,
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    currentMaximus: {
        paddingLeft: 20,
    },
    startDate: {
        paddingLeft: 20,
    },
    column: {
        flexBasis: '33.33%',
    },
    paddingLeft: {
        paddingLeft: 20
    },
    fontWeight: {
        fontWeight: 590,
    },
    weekDayLabel: {
        fontWeight: 800,
        color: theme.palette.primary.main,
    },
    formHelperTextColor: {
        color: theme.palette.secondary.main
    }
});

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            plan: {},
            plan_name: '',
            plan_type: 'beginner',
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
            // level: 'beginner',
            planStateInit: false,
            //Routine Day
            exercise11: '',
            exercise12: '',
            exercise13: '',
            // Day 2
            exercise21: '',
            exercise22: '',
            exercise23: '',
        });

        this.onChange = this.onChange.bind(this);
        // this.onChecked = this.onChecked.bind(this);
        //this.onSelect = this.onSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSavePlan = this.onSavePlan.bind(this);
        this.onDeletePlan = this.onDeletePlan.bind(this);
        this.onCreateRoutine = this.onCreateRoutine.bind(this);
    };

    componentDidMount() {
        this.props.getPlan();
        this.props.getRoutineDay();
    };

    static getDerivedStateFromProps(props, state) {
        let dt = '';

        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        if (props.routineDay !== state.routineDay && !state.routineDStateInit) {
            return {
                // Day 1
                exercise11: props.routineDay.exercise11,
                exercise12: props.routineDay.exercise12,
                exercise13: props.routineDay.exercise13,
                // Day 2
                exercise21: props.routineDay.exercise21,
                exercise22: props.routineDay.exercise22,
                exercise23: props.routineDay.exercise23,
                routineDStateInit: true
            }
        }

        if (props.plan.plan !== state.plan) {
            // if (props.plan.plan !== state.plan && !state.planStateInit) {

            if (props.plan.plan._id) {

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
                    plan: props.plan.plan,
                    plan_name: props.plan.plan.plan_name,
                    plan_type: props.plan.plan.plan_type,
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
                    planStateInit: true
                };
            }
        }

        return null;
    };

    onSavePlan(event) {

        const planData = {
            plan_name: this.state.plan_name,
            plan_type: this.state.plan_type,
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
            start_date: this.state.start_date,
        };

        this.props.savePlan(planData, this.props.history);
    };

    onDeletePlan(event) {
        this.props.deletePlan(this.props.history);
    };

    onCreateRoutine(event) {
        switch (this.state.plan_type) {
            case 'beginner': {
                this.props.createRoutineBeginner(this.props.history);
                return
            }
            case 'experienced': {
                this.props.createRoutineExperienced(this.props.history);
                return;
            }
            case 'fixed': {
                this.props.createRoutineFixed(this.props.history);
                return;
            }
            default: {
                return;
            }
        }
    }

    onChecked = name => event => {
        this.setState({[name]: event.target.checked});
    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    handleChange(event) {
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
        const {routineDay} = this.props.routineDay;

        // let weightsText = '';
        let button_text = 'add';
        let plan_exist = false;

        if (plan._id) {
            plan_exist = true;
            button_text = 'update'
        }

        let panelLines;

        if (!loading) {
            panelLines =
                <Grid className={classes.grid} container justify="center">
                    <Card className={classes.card} elevation={0}>
                        <CardHeader
                            classes={{title: classes.header}}
                            title={"Routine Plan"}
                        />

                        <CardContent>
                            <Typography
                                variant="subtitle2"
                                color="primary"
                            >
                                Select 3 training week days:
                            </Typography>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("monday")}
                                            checked={this.state.monday}
                                            value="monday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(1)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(1)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("tuesday")}
                                            checked={this.state.tuesday}
                                            value="tuesday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(2)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(2)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("wednesday")}
                                            checked={this.state.wednesday}
                                            value="wednesday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(3)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(3)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("thursday")}
                                            checked={this.state.thursday}
                                            value="thursday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(4)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(4)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("friday")}
                                            checked={this.state.friday}
                                            value="friday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(5)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(5)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("saturday")}
                                            checked={this.state.saturday}
                                            value="saturday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(6)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(6)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onChecked("sunday")}
                                            checked={this.state.sunday}
                                            value="sunday"
                                            color="primary"
                                            className={classes.size}
                                        />
                                    }
                                    classes={(moment(this.state.start_date).format('ddd') === moment.weekdaysShort(0)) ? {label: classes.weekDayLabel} : {}}
                                    labelPlacement={"top"}
                                    label={moment.weekdaysShort(0)}
                                />
                                <FormHelperText
                                    error={!isEmpty(errors.workout_days)}
                                >
                                    {errors.workout_days}
                                </FormHelperText>
                            </FormGroup>

                            <Typography
                                style={{paddingTop: 10}}
                                color="primary"
                                variant={"subtitle2"}
                            >
                                Start date:
                            </Typography>
                            <TextField
                                className={classes.paddingLeft}
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
                            <Typography
                                className={classes.paddingLeft}
                                display="inline"
                                variant={"caption"}
                            >
                                {moment(this.state.start_date).format('dddd')}
                            </Typography>

                            {/*<Divider variant='fullWidth'  style={{marginTop: 20, height: 4}}/>*/}

                            <Typography
                                style={{paddingTop: 15}}
                                variant="subtitle2"
                                color="primary"
                            >
                                Select an exercise level:
                            </Typography>

                            <RadioGroup
                                // classes={{title: classes.radioGroup}}
                                className={classes.radioGroup}
                                aria-label="plan_type"
                                name="plan_type"
                                value={this.state.plan_type}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value="beginner"
                                    control={<Radio color="primary"/>}
                                    label="Beginner"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    className={classes.fontWeight}
                                    value="experienced"
                                    control={<Radio color="primary"/>}
                                    label="Experienced"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="fixed"
                                    control={<Radio color="primary"/>}
                                    label="Fixed"
                                    labelPlacement="top"
                                />
                            </RadioGroup>

                            <Typography
                                className={classes.fontWeight}
                                style={{paddingLeft: 'inherit'}}
                                variant="subtitle1"

                            >
                                {(() => {
                                    switch (this.state.plan_type) {
                                        case "beginner":
                                            return "No starting kgs/reps needed";
                                        case "experienced":
                                            return "Estimate maximum kgs/reps";
                                        case "fixed":
                                            return "Enter fixed starting kgs";
                                        default:
                                            return "Current maximums";
                                    }
                                })()}
                            </Typography>

                            <FormHelperText
                                error={!isEmpty(errors.noRoutineDay)}
                            >
                                {errors.noRoutineDay}
                            </FormHelperText>


                            <Typography
                                className={classes.currentMaximus}
                                variant="subtitle1"
                            >
                                {routineDay.exercise11}
                            </Typography>
                            <TextField
                                className={classes.kg}
                                value={this.state.squat_max_kg}
                                error={!isEmpty(errors.squat_max_kg)}
                                helperText={errors.squat_max_kg}
                                name="squat_max_kg"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner'}
                                inputProps={{min: "20", max: "500", step: "2.5"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.reps}
                                value={this.state.squat_max_reps}
                                error={!isEmpty(errors.squat_max_reps)}
                                helperText={errors.squat_max_reps}
                                name="squat_max_reps"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner' || this.state.plan_type === 'fixed'}
                                inputProps={{min: "1", max: "20", step: "1"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                }}
                            />
                            <Typography
                                className={classes.currentMaximus}
                                variant="subtitle1"
                            >
                                {routineDay.exercise12}
                            </Typography>
                            <TextField
                                className={classes.kg}
                                value={this.state.bench_max_kg}
                                error={!isEmpty(errors.bench_max_kg)}
                                helperText={errors.bench_max_kg}
                                name="bench_max_kg"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner'}
                                inputProps={{min: "20", max: "500", step: "2.5"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.reps}
                                value={this.state.bench_max_reps}
                                error={!isEmpty(errors.bench_max_reps)}
                                helperText={errors.bench_max_reps}
                                name="bench_max_reps"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner' || this.state.plan_type === 'fixed'}
                                inputProps={{min: "1", max: "20", step: "1"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                }}
                            />
                            <Typography
                                className={classes.currentMaximus}
                                variant="subtitle1"
                            >
                                {routineDay.exercise13}
                            </Typography>
                            <TextField
                                className={classes.kg}
                                value={this.state.barbell_row_max_kg}
                                error={!isEmpty(errors.barbell_row_max_kg)}
                                helperText={errors.barbell_row_max_kg}
                                name="barbell_row_max_kg"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner'}
                                inputProps={{min: "20", max: "500", step: "2.5"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.reps}
                                value={this.state.barbell_row_max_reps}
                                error={!isEmpty(errors.barbell_row_max_reps)}
                                helperText={errors.barbell_row_max_reps}
                                name="barbell_row_max_reps"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner' || this.state.plan_type === 'fixed'}
                                inputProps={{min: "1", max: "20", step: "1"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                }}
                            />


                            <Typography
                                className={classes.currentMaximus}
                                variant="subtitle1"
                            >
                                {routineDay.exercise22}
                            </Typography>

                            <TextField
                                className={classes.kg}
                                value={this.state.overhead_max_kg}
                                error={!isEmpty(errors.overhead_max_kg)}
                                helperText={errors.overhead_max_kg}
                                name="overhead_max_kg"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner'}
                                inputProps={{min: "20", max: "500", step: "2.5"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.reps}
                                value={this.state.overhead_max_reps}
                                error={!isEmpty(errors.overhead_max_reps)}
                                helperText={errors.overhead_max_reps}
                                name="overhead_max_reps"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner' || this.state.plan_type === 'fixed'}
                                inputProps={{min: "1", max: "20", step: "1"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                }}
                            />

                            <Typography
                                className={classes.currentMaximus}
                                variant="subtitle1"
                            >
                                {routineDay.exercise23}
                            </Typography>

                            <TextField
                                className={classes.kg}
                                value={this.state.deadlift_max_kg}
                                error={!isEmpty(errors.deadlift_max_kg)}
                                helperText={errors.deadlift_max_kg}
                                name="deadlift_max_kg"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner'}
                                inputProps={{min: "20", max: "500", step: "2.5"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                            />
                            <TextField
                                className={classes.reps}
                                value={this.state.deadlift_max_reps}
                                error={!isEmpty(errors.deadlift_max_reps)}
                                helperText={errors.deadlift_max_reps}
                                name="deadlift_max_reps"
                                type="number"
                                onChange={this.onChange}
                                disabled={this.state.plan_type === 'beginner' || this.state.plan_type === 'fixed'}
                                inputProps={{min: "1", max: "20", step: "1"}}
                                // eslint-disable-next-line
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                                }}
                            />

                        </CardContent>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                className={classes.buttonWidth}
                                href={""}
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onSavePlan}
                            >
                                {button_text}
                            </Button>
                            <Button
                                className={classes.buttonPadding}
                                href={""}
                                component={this.renderLink}
                                to="/"
                                size={"medium"}
                                variant={"contained"}
                                color="inherit"
                                onClick={this.onCancel}
                            >
                                cancel
                            </Button>

                        </CardActions>
                        <CardActions className={classes.buttonJustify}>
                            <Button
                                className={classes.buttonWidth}
                                href={""}
                                disabled={!plan_exist}
                                size={"medium"}
                                variant={"contained"}
                                color="primary"
                                onClick={this.onCreateRoutine}
                            >
                                create
                            </Button>
                            <Button
                                className={classes.buttonPadding}
                                href={""}
                                disabled={!plan_exist}
                                size={"medium"}
                                variant={"contained"}
                                color="secondary"
                                onClick={this.onDeletePlan}
                            >
                                delete plan
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
    getRoutineDay: PropTypes.func.isRequired,
    savePlan: PropTypes.func.isRequired,
    getPlan: PropTypes.func.isRequired,
    deletePlan: PropTypes.func.isRequired,
    createRoutineBeginner: PropTypes.func.isRequired,
    createRoutineExperienced: PropTypes.func.isRequired,
    createRoutineFixed: PropTypes.func.isRequired,
    plan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    routineDay: state.routineDay,
    plan: state.plan,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getRoutineDay,
    savePlan,
    getPlan,
    deletePlan,
    createRoutineBeginner,
    createRoutineExperienced,
    createRoutineFixed
})(withStyles(styles)(Plan));
