/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import {
  InputAdornment, Menu, MenuItem, IconButton, CircularProgress
} from '@material-ui/core';
import { Visibility, VisibilityOff, Phone, PhoneOutlined } from '@material-ui/icons';
import {
  SDiv as Content, Input, SText, StyledButton, AtIcon, LockIcon, SImg
} from '../../Components';
import logo from '../../../assets/img/logo.png';
import { APIS, request } from '../../../_services';
import { initSignup } from '../../../_actions/authAction';
// import { setAlert } from '../../../../_store/actions';
// import { login } from '../../../../_store/actions/authActions';


export const Login = (props) => {
  const { dispatch, userInfo, initSignup, history, match } = props;
  const { phone } = initSignup;
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState({ flagCode: 'ng', countryCode: '+234' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (userInfo.isLoggedIn) history.push('/app')
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const selectCountry = (e) => {
    setCountry(e);
    setAnchorEl(null);
  };

  const submit = async () => {
    const { baseUrl, verifyOtp: { method, path } } = APIS;
    const url = `${baseUrl}${path}`;
    const data = {
      otp, phone: `+234${phone.substring(1)}`
    };
    setLoading(true);
    const response = await request(method, url, data);
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      // dispatch(login({ ...response.data, isLoggedin: true }));
      // dispatch(setAlert({ open: true, variant: 'info', message: 'Welcome!' }));
      setLoading(false);
      history.push('/signup/complete');
    } else if (response.meta && response.meta.status === 404) {
      // dispatch(setAlert({ open: true, variant: 'error', message: 'Invalid email or password' }));
    } else {
      console.log('error');
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
      <Content borderR="0.5em" height="35%" width="25%" mobWidth="80%" bg="#fff" padding="2em" flex align="center" justify="space-evenly" mobJustify="space-evenly" mobHeight="50%">
        <Content justify="center" align="center" height="4em" vmargin="1em" flex>
          <SImg alt="" src={logo} />
        </Content>
        <Content width="90%" mobWidth="90%" bmargin="1.5em">
          <SText size="27px" weight="600" color="#444444" lineHeight={1.2}>Verify OTP</SText>
          <SText size="14px" weight="400" color="#999999">Enter the OTP sent to your phone</SText>
        </Content>
        <Content width="90%" mobWidth="90%" height="40%" mobHeight="40%" flex justify="space-around" mobJustify="space-around">
          <Input
            label="OTP"
            type="number"
            variant="outlined"
            name="OTP"
            value={otp}
            onChange={({ target }) => setOtp(target.value)}
            preicon={<LockIcon color="#666666" size="16px" />}
          />
        </Content>
        <Content flex align="center" justify="center" height="20%" mobWidth="100%" mobHeight="20%">
          <StyledButton
            color="primary"
            width="80%"
            variant="contained"
            onClick={submit}
          >
            {loading ? <CircularProgress style={{ color: '#ffffff' }} size={24} /> : 'Verify OTP'}

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

export default connect(mapStateToProps)(Login);
