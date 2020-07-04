import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Input, Content, SText, StyledButton, colors, SDiv } from '../Components';
import { getData, URLS } from '../../_services';
import { setAlert } from '../../_actions/userActions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, history } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialogs = (props) => {
  const { handleClose, open, userInfo, submit, history, dispatch } = props;
  const { walletBal } = userInfo;
  const [loading, setLoading] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false)
  const [formInputs, setformInputs] = useState({
    userId: userInfo.userId,
    date: new Date().toISOString(),
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      const skill = await getData('GET', `${URLS.GETSKILLS}`);
      console.log(skill);
      if (!Object.prototype.hasOwnProperty.call(skill, 'meta')) {
        return null;
      }

      if (skill.meta.status !== 200) {
        return null;
      }
      return setSkills(skill.data.skills);
    };
    getSkills();
  }, []);
  const handleChange = ({ target }) => {
    const value = () => {
      if (target.name === 'price') {
        return parseInt(target.value, 10);
      }
      return target.value;
    };
    return setformInputs(inputs => ({
      ...inputs,
      [target.name]: value()
    }));
  };

  const handleSubmit = async () => {
    if (formInputs.price > walletBal) {
      setOpenFeedback(true);
      return;
    }
    setLoading(true);
    const response = await getData('POST', URLS.POSTJOB, formInputs);
    console.log(response);
    // if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
    //   return;
    // }

    if (response.meta && response.meta.status === 200) {
      dispatch(setAlert({ open: true, variant: 'info', message: 'Job posted' }));
      console.log('successfully posted');
      submit();
      setLoading(false);
      props.handleClose();
    } else {
      dispatch(setAlert({ open: true, variant: 'error', message: 'Unable to complete' }));
      setLoading(false);
    }
  };

  const skillOptions = skills.map(skill => ({
    name: skill.skill_name,
    value: skill.skill_id
  }));
  return (
    <>
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Post a Job
        </DialogTitle>
        <DialogContent dividers>
          <Content hpadding="1em">
            <Input type="text" label="Job Title" variant="outlined" vmargin="0.5em" name="jobTitle" value={formInputs.jobTitle} onChange={e => handleChange(e)} />
            <Content display="flex" horizontal justify="space-between">
              <Input
                label="Category"
                variant="outlined"
                select
                options={skillOptions}
                name="skillId"
                value={formInputs.skillId}
                onChange={e => handleChange(e)}
                vmargin="0.5em"
                width="45%"
              />
              <Input type="number" label="Price" variant="outlined" preicon="&#8358;" vmargin="0.5em" width="45%" name="price" value={formInputs.price} onChange={e => handleChange(e)} />
            </Content>
            <Input label="Job Description" variant="outlined" vmargin="0.5em" multiline rows="4" name="jobDesc" value={formInputs.jobDesc} onChange={e => handleChange(e)} />
          </Content>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()} color="primary">
            {loading ? <CircularProgress style={{ color: colors.primary }} size={24} /> : <SText color={colors.primary} size="14px" weight="700">Post Job</SText>}

          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={() => setOpenFeedback(false)} open={openFeedback} fullWidth maxWidth="xs">
        <DialogTitle>Rate Service Provider</DialogTitle>
        <SDiv flex align="center" vmargin="1em">
          You do not have sufficient funds in your wallet for this job
        </SDiv>
        <DialogActions>
          <StyledButton
            color="primary"
            vmargin="1em"
            onClick={() => setOpenFeedback(false)}
          >
            Cancel
          </StyledButton>
          <StyledButton
            color="primary"
            vmargin="1em"
            onClick={() => history.push('/profile')}
          >
              Go to Wallet
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});
export default withRouter(connect(mapStateToProps)(CustomizedDialogs));
