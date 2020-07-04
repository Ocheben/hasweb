/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import fileUpload from 'fuctbase64';
// import { withStyles } from '@material-ui/core/styles';
import {
  InputAdornment, Menu, MenuItem, IconButton, CircularProgress
} from '@material-ui/core';
import {
  Visibility, VisibilityOff, Phone, PhoneOutlined, CloudUploadOutlined, VisibilityOutlined, VisibilityOffOutlined
} from '@material-ui/icons';
import {
  SDiv as Content, Input, SText, StyledButton, PersonIcon, LockIcon, SImg
} from '../../Components';
import logo from '../../../assets/img/logo.png';
import { APIS, request } from '../../../_services';
// import { setAlert } from '../../../../_store/actions';
import { saveUser } from '../../../_actions/authAction';


export const Complete = (props) => {
  const { dispatch, initSignup, history } = props;
  const { email, phone } = initSignup;
  const fileInput = React.createRef();
  const [formInputs, setFormInputs] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [invalidFile, setInvalidFile] = useState(false);
  const [passwords, setPasswords] = useState({});
  // useEffect(() => {
  //   if (userInfo.isLoggedIn) history.push('/app');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleChangePassword = ({ name, value }) => {
    setPasswords((prev) => {
      if ((name === 'password' && value === prev.confirm)
      || (name === 'confirm' && value === prev.password)) {
        setFormInputs(pre => ({ ...pre, password: value }));
      }
      return { ...prev, [name]: value };
    });
  };

  const fileHandler = (event) => {
    if (event.target.files.length) {
      const fileObj = event.target.files[0];
      const fileName = fileObj.name;

      // check for file extension and pass only if it is .xlsx and display error message otherwise
      const extensionName = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
      console.log(fileObj);
      console.log(extensionName);
      if (extensionName === 'jpg' || extensionName === 'png' || extensionName === 'pdf') {
        fileUpload(event).then(data => setFormInputs(prev => ({ ...prev, validid: data.base64 })));
        setUploadFileName(fileName);
        setInvalidFile(false);
      } else {
        setUploadFileName('');
        setInvalidFile(true);
      }
    }
  };

  const submit = async () => {
    const { testUrl, signup: { method, path } } = APIS;
    const url = `${testUrl}${path}`;
    setLoading(true);
    const response = await request(method, url, { ...formInputs, email, phone: `+234${phone.substring(1)}` });
    console.log(response, formInputs);
    if (response.meta && response.meta.status === 200) {
      // dispatch(login({ ...response.data, isLoggedin: true }));
      // dispatch(setAlert({ open: true, variant: 'info', message: 'Welcome!' }));
      dispatch(saveUser({ ...response.data, isLoggedin: true }));
      setLoading(false);
      history.push('/login');
    } else if (response.meta && response.meta.status === 404) {
      // dispatch(setAlert({ open: true, variant: 'error', message: 'Unable to sign up' }));
    }
    setLoading(false);
  };

  return (
    <Content
      height="100vh"
      mobHeight="100vh"
      bg="#e9e9e9"
      flex
      justify="center"
      align="center"
    >
      <Content borderR="0.5em" height="60%" width="40%" mobWidth="80%" bg="#fff" padding="2em" flex align="center" justify="space-evenly" mobJustify="space-evenly" mobHeight="50%">
        <Content justify="center" align="center" height="4em" vmargin="1em" flex>
          <SImg alt="" src={logo} />
        </Content>
        <Content width="90%" mobWidth="90%" bmargin="1.5em">
          <SText size="27px" weight="600" color="#444444" lineHeight={1.2}>Complete Signup</SText>
          <SText size="14px" weight="400" color="#999999">Please provide the following information</SText>
        </Content>
        <Content width="90%" mobWidth="90%" height="40%" mobHeight="40%" flex justify="space-around" mobJustify="space-around">
          <Content flex horizontal justify="space-between">
            <Input
              label="First Name"
              type="text"
              variant="outlined"
              width="48%"
              name="firstname"
              value={formInputs.firstname}
              onChange={({ target }) => setFormInputs(prev => ({ ...prev, firstname: target.value }))}
              preicon={<PersonIcon color="#666666" size="16px" />}
            />
            <Input
              label="Last Name"
              type="text"
              variant="outlined"
              width="48%"
              name="lastname"
              value={formInputs.lastname}
              onChange={({ target }) => setFormInputs(prev => ({ ...prev, lastname: target.value }))}
              preicon={<PersonIcon color="#666666" size="16px" />}
            />
          </Content>
          <Input
            label="Valid ID"
            type="text"
            variant="outlined"
            name="validid"
            value={uploadFileName}
            onChange={({ target }) => setFormInputs(prev => ({ ...prev, lastname: target.value }))}
            preicon={(
              <>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => fileInput.current.click()}
                >
                  <CloudUploadOutlined />
                </IconButton>
                <input
                  type="file"
                  hidden
                  onChange={fileHandler}
                  ref={fileInput}
                  onClick={({ target }) => { target.value = null; }}
                />
              </>
)}
          />
          <Content flex horizontal justify="space-between">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              width="48%"
              variant="outlined"
              name="password"
              value={passwords.password || ''}
              onChange={({ target }) => handleChangePassword(target)}
              preicon={<LockIcon color="#666666" size="16px" />}
              endicon={(
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
  )}
            />
            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              width="48%"
              variant="outlined"
              name="confirm"
              value={passwords.confirm || ''}
              onChange={({ target }) => handleChangePassword(target)}
              preicon={<LockIcon color="#666666" size="16px" />}
              endicon={(
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              )}
            />
          </Content>
        </Content>
        <Content flex align="center" justify="center" height="20%" mobWidth="100%" mobHeight="20%">
          <StyledButton
            color="primary"
            width="80%"
            variant="contained"
            onClick={submit}
          >
            {loading ? <CircularProgress style={{ color: '#ffffff' }} size={24} /> : 'Complete Signup'}

          </StyledButton>
        </Content>
      </Content>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  initSignup: state.userInfo.initSignup
});

export default connect(mapStateToProps)(Complete);
