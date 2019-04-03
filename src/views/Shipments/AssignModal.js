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
import {TextField, MenuItem} from '@material-ui/core';
import { connect } from 'react-redux';
import {assignBiker} from '../../_actions/authAction'

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

class AssignModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        bikerInfo: {},
        bikername: ''
      };
      this.dispatch = props.dispatch
  }

  // componentDidMount(){
  //   if(this.props.userInfo.role !== 'admin') {
  //     this.props.history.push('./bikershipment')
  //   }
  // }

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
    const {bikerInfo} = this.state
    const data = {
      index: this.props.itemIndex, 
      bikerid: bikerInfo.bikerid, 
      status:"assigned",
      assignee: bikerInfo.name
    };
    this.dispatch(assignBiker(data))
    this.handleClose()
  }

  render() {
    const {classes, userInfo, bikers} = this.props
    const {bikerInfo} = this.state
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
      <div>
        <Dialog
        open={this.props.open}
        onClose={this.handleClose}
          aria-labelledby="assignModal"
          maxWidth="sm" fullWidth 
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent style={{margin:"0 5em"}}>
            <Typography gutterBottom>
              Please select a biker to assign this shipment to.
            </Typography>
            <TextField id="select_biker" variant="outlined" select label="Select Biker"
            className={classes.textField} {...textFieldProps} value={bikerInfo}
            name="select_biker" onChange={this.handleChange}
            style={{margin:"1em 0"}}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            {bikers.map(option => (
              <MenuItem key={option.bikerid} value={option}>
              {option.name}
              </MenuItem>
              ))}
              </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Assign Biker
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      userInfo: state.saveUser.userInfo,
      bikers: state.saveUser.bikers
    }
}

export default connect(mapStateToProps)(withStyles(styles)(AssignModal));