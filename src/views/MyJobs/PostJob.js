import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Input, Content } from '../Components';
import { getData, URLS } from '../../_services';

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
  const { children, classes, onClose } = props;
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
  const { handleClose, open, userInfo } = props;
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
    console.log(skills);
    const value = () => {
      if (target.name === 'price') {
        return parseInt(target.value, 10);
      }
      return target.value;
    };
    console.log(formInputs);
    return setformInputs(inputs => ({
      ...inputs,
      [target.name]: value()
    }));
  };

  const handleSubmit = async () => {
    const response = await getData('POST', URLS.POSTJOB, formInputs);
    if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
      return null;
    }

    if (response.meta.status !== 200) {
      return null;
    }
    console.log('successfully posted');
    return props.handleClose();
  };

  const skillOptions = skills.map(skill => ({
    name: skill.skill_name,
    value: skill.skill_id
  }));
  return (
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
            Post Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  userInfo: state.saveUser.userInfo
});
export default connect(mapStateToProps)(CustomizedDialogs);
