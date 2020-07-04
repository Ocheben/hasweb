import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { CircularProgress } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Loadable from 'react-loadable';
// import { DefaultLayout } from './container/DefaultLayout';
// import { Login, Register } from './views/Pages';
// import InitiateSignup from './views/Pages/Signup/Initiate';
// import CompleteSignup from './views/Pages/Signup/Complete';
import { blue } from './mui';
// import Verify from './views/Pages/Signup/Verify';
import { Alert, Content, colors, SDiv } from './views/Components';
import { setAlert } from './_actions/userActions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: grey[400]
    },
    error: {
      main: '#f86c6b'
    },
    success: {
      main: '#388e3c'
    },
    disabled: {
      main: '#daa520'
    },
    textPrimary: {
      main: '#daa520'
    }
  },
  direction: 'ltr',
  overrides: {
    MuiStepLabel: {
      label: {
        backgroundColor: '#d9ecbc',
        color: 'white',
        '&$active': {
          color: 'primary',
          backgroundColor: '#fff',
          border: '2px solid #00913e',

        },
        '&$completed': {
          color: '#fff',
          backgroundColor: '#00913e'
        },
      },
    },
    MuiStep: {
      horizontal: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  },
});

// const InitiateSignup = Loadable({
//   loader: () => import('./views/Pages/Signup/Initiate'),
//   loading: <CircularProgress size={24} />,
//   delay: 200
// });

const Loading = ({ error, pastDelay }) => {
  if (error) {
    return <div>error</div>;
  }
  if (pastDelay) {
    return (
      <SDiv flex justify="center" height="95vh" align="center">
        <CircularProgress style={{ color: colors.primary }} size={50} />
      </SDiv>
    );
  }
  return null;
};

const Login = Loadable({
  loader: () => import('./views/Pages/Login/Login'),
  loading: Loading,
  delay: 200
});

const InitiateSignup = Loadable({
  loader: () => import('./views/Pages/Signup/Initiate'),
  loading: Loading,
  delay: 200
});

const Verify = Loadable({
  loader: () => import('./views/Pages/Signup/Verify'),
  loading: Loading,
  delay: 200
});

const CompleteSignup = Loadable({
  loader: () => import('./views/Pages/Signup/Complete'),
  loading: Loading,
  delay: 200
});

const DefaultLayout = Loadable({
  loader: () => import('./container/DefaultLayout/DefaultLayout'),
  loading: Loading,
  delay: 200
});

const App = ({ dispatch, userData: { alert } }) => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Alert
        open={alert.open}
        variant={alert.variant}
        message={alert.message}
        handleClose={() => dispatch(setAlert({ open: false, variant: 'info', message: '' }))}
      />
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login" component={Login} />
          <Route exact path="/signup/init" name="Sign Up" component={InitiateSignup} />
          <Route exact path="/signup/verify/:phone" name="Verify OTP" component={Verify} />
          <Route exact path="/signup/complete" name="Complete Sign UP" component={CompleteSignup} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>

    </div>
  </MuiThemeProvider>
);
const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo,
  userData: state.userData
});
export default connect(mapStateToProps)(App);
