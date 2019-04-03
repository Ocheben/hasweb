import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { red, teal } from '@material-ui/core/colors';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Alert extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    // this.setState({ open: false });
    this.props.handleClose()
  };

  render() {
    const { classes, open, error } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            style:{backgroundColor:error ? red[700] : teal[500], margin:"2em"}
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alert);