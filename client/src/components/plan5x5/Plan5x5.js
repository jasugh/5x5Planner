import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import {getRoutineDay} from "../../actions/routineDayActions";
import {deletePlan, getPlan, savePlan} from "../../actions/planActions";
import {createRoutineBeginner, createRoutineExperienced, createRoutineFixed} from "../../actions/routineActions";

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TrainingDays from "./TrainingDays";
import TrainingWeights from "./TrainingWeights";
import CreateRoutine from "./CreateRoutine";

function getSteps() {
    return ['Select training days and start date', 'Enter starting weights', 'Create exercise plan'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (
                <TrainingDays/>
            );

        case 1:
            return (
                <TrainingWeights/>
            );
        case 2:
            return (
                <CreateRoutine/>
            );

        default:
            return 'Uknown stepIndex';
    }
}

const styles = theme => ({
    root: {
        width: 500,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});

const steps = getSteps();

class Plan5X5 extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            activeStep: 0,
        });

        this.handleReset = this.handleReset.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
    };

    handleNext() {
        this.setState({activeStep: this.state.activeStep + 1});
    }

    handleBack() {
        this.setState({activeStep: this.state.activeStep - 1});
    }

    handleReset() {
        this.setState({activeStep: 0});
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                {/*<div className={classes.root}>*/}
                <Stepper
                    activeStep={this.state.activeStep}
                    alternativeLabel
                >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container justify="center">
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography
                                className={classes.instructions}
                            >
                                All steps completed
                            </Typography>
                            <Button
                                onClick={this.handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography
                                className={classes.instructions}
                            >
                                {getStepContent(this.state.activeStep)}
                            </Typography>
                            <div>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                >
                                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Grid>
            </Grid>

        );
    }
}

Plan5X5.propTypes = {
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
})(withStyles(styles)(Plan5X5));
