import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {styles} from '../../scss/style';
import {Grid} from '@material-ui/core';
import { connect } from 'react-redux';
import {pickUp, deliver} from '../../_actions/authAction';
import { DateFnsUtils, MuiPickersUtilsProvider, DatePicker, TimePicker, } from '../../mui';
import Media from "react-media";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class FulfillModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        bikerInfo: {},
        bikername: '',
        date: new Date(),
        time: new Date(),
        formInputs: {
            date: new Date().toDateString(), 
            time: new Date().toLocaleTimeString(),
            status: this.props.isPickup ? 'picked_up' : 'delivered'
        },
        isMobile:''
      };
      this.dispatch = props.dispatch
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({...this.state})
  };

  handleChange=(e)=>{
    // const {bikerid, name} = e.target.value
      this.setState({
          bikerInfo: e.target.value,
      })
  }

  handleSubmit=()=> {
    const {date, time} = this.state.formInputs
    const data = {
      index: this.props.itemIndex, 
      date: date, 
      time: time,
      status: this.props.isPickup ? 'picked_up' : 'delivered'
    };
    if (this.props.isPickup) {
        this.dispatch(pickUp(data))
    }
    else {
        this.dispatch(deliver(data))
    }
    
    this.handleClose()
  }

  handleDateChange = (date, name) => {
    this.setState({
        [name]: date,
        formInputs: {
            ...this.state.formInputs,
            [name]: name === 'date' ? date.toDateString() : date.toLocaleTimeString()
        } 
    });
  };

  render() {
    const {classes,  isPickup, itemName} = this.props
    const {date, time, isMobile} = this.state
    const textFieldProps = {
        InputLabelProps:{
            classes: {
                root: classes.label,
            }
        },
        InputProps:{
            classes: {
                input: classes.size,
            },
        },
        FormHelperTextProps:{
            className: "formHelper"
        }
    }
    return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
      <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})}/>
        <Dialog
        open={this.props.open}
        onClose={this.handleClose}
          aria-labelledby="FulfillModal"
          maxWidth="sm" fullWidth 
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {isPickup ? `Pick up ${itemName}`: `Deliver ${itemName}`}
          </DialogTitle>
          <DialogContent style={{margin:"0 1em"}}>
            <Typography gutterBottom>
              Add Time Stamp
            </Typography>
            <Grid container spacing={24}>
            <Grid item xs={isMobile ? 12 : 6}>
            <DatePicker margin="normal" label={isPickup ? 'Pick up Date' : 'Delivery Date'} value={date} 
                onChange={(date)=>this.handleDateChange(date, 'date')} variant="outlined"
                className={classes.modalInput} {...textFieldProps}
                
            />
            </Grid>
          <Grid item xs={isMobile ? 12 : 6}>
          <TimePicker variant="outlined"
          className={classes.modalInput} {...textFieldProps}
            margin="normal"
            label={isPickup ? 'Pick up Time' : 'Delivery Time'}
            value={time}
            onChange={(date)=>this.handleDateChange(date, 'time')}
          />
          </Grid>  
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Confirm {isPickup?'Pick Up' : 'Delivery'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </MuiPickersUtilsProvider>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      userInfo: state.saveUser.userInfo
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FulfillModal));