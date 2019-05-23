import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepConnector from "@material-ui/core/StepConnector";
import StepIcon from '@material-ui/core/StepIcon';
import {Card, CardHeader, CardContent, CardActions, TextField, Slide, CheckIcon, green } from '../../mui'

const styles = theme => ({
  root: {
    width: '100%',
    margin: 'auto',

  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main
    }
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: green[100]
    }
  },
  connectorLine: {
    transition: theme.transitions.create("border-color"),
    border: "1px solid"
  },
  stepperLabel: {
    display:"flex",
    alignItems: "center",
    padding:"0.8em 1em 0.8em 1em",
    color: "#00913e",
    borderRadius:"50px",

  },
  rootLabel: {

  },
  activeLabel : {
    border: "2px solid #00913e",
  },
  completedLabel : {
   
  },
  stepperIcon: {
    height: "20px",
    paddingLeft: "0.3em",
    color: "#fff"
  }
});


class MainStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  isStepOptional = step => {
    return step === 5;
  };

  isStepFailed = step => {
    return step === 5;
  };

  handleNext = () => {
    const { activeStep, } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
    const {getPage} = this.props
    getPage(activeStep+1)
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
    const {getPage} = this.props
    getPage(activeStep+1)
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes, steps, activeStep, theme } = this.props;
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );
  
    return (
      <div className={`${classes.root} ${this.props.className}`}  >
        <Stepper activeStep={this.props.activeStep} className="noVerticalPadding" 
        style={{justifyContent:"center", backgroundColor:"inherit", padding:0}} connector={connector}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );
            }
            if (this.isStepFailed(index)) {
              labelProps.error = true;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            console.log(activeStep, index) 
            // const stepColor = activeStep < index ? "red" : activeStep === index ? "#daa520" : "#0B3cde"
            return (
              <Step key={label} >
                <StepLabel icon=""
                classes={{label: classes.stepperLabel, active:classes.activeLabel, completed:classes.completedLabel}}
                // icon={activeStep <= index ? index+1 : <CheckIcon/> }
                >{label} {activeStep > index && <CheckIcon className={classes.stepperIcon}/>}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

MainStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(MainStepper);