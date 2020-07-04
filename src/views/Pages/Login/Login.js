import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Media from 'react-media';
import { connect } from 'react-redux';
import logo from '../../../assets/img/logo.png';
import { styles } from '../../../scss/style';
import {
  Grid, Card, CardContent, CardActions, TextField, CircularProgress,
  InputAdornment, Visibility, VisibilityOff, IconButton,
  Grow, classNames, Button, Icon, Fade
} from '../../../mui';
import { getData, URLS, METHODS } from '../../../_services';
import { saveUser } from '../../../_actions/authAction';
import Alert from '../../Components/LocalAlert';
import { SText, SDiv as Content, SImg } from '../../Components';
import { setAlert } from '../../../_actions/userActions';
// import { Fade } from '@material-ui/core/'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: '',
      loading: false,
      showPassword: false,
      formInputs: { email: '', password: '' },
      formValidity: {},
      alertOpen: false,
      alertMessage: ''
    };
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    if (this.props.userInfo.isLoggedin) {
      this.props.history.push('/dashboard');
    }
  }


      handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          formInputs: {
            ...this.state.formInputs,
            [name]: value
          }
        });
      }

      handleAlertClose= () => {
        this.setState({ alertOpen: false });
      }

      handleSubmit = async () => {
        const { email, password } = this.state.formInputs;
        this.setState({ loading: true });
        const data = { email, password };
        const response = await getData(METHODS.LOGIN, URLS.LOGIN, data);
        this.setState({ loading: false });
        if (response.meta && response.meta.status === 200) {
          this.dispatch(saveUser({ ...response.data, isLoggedin: true }));
          this.dispatch(setAlert({ open: true, variant: 'info', message: 'You have successfully loged in' }));
          this.props.history.push('/dashboard');
        } else {
          this.dispatch(setAlert({
            open: true,
            variant: 'error',
            message: response.meta && response.meta.status === 406 ? response.meta.message
              : 'There might be something wrong with your connection'
          }));
          // this.setState({
          //   alertOpen: true,
          //   alertMessage: response.meta.status === 406 ? response.meta.message
          //     : 'You are not connected to the internet',
          //   loading: false
          // });
        }
      };


      showPassword = () => {
        this.setState({
          showPassword: !this.state.showPassword
        });
      }

      render() {
        const { classes } = this.props;
        const {
          isMobile, loading, showPassword, formInputs,
          alertMessage, alertOpen
        } = this.state;
        const gridSize = isMobile ? 12 : 4;
        const completeForm = Object.values(formInputs).every(value => value !== '');
        const textFieldProps = {
          InputLabelProps: {
            classes: {
              root: classes.label,
            }
          },
          FormHelperTextProps: {
            className: 'formHelper'
          }
        };
        return (
          <div className={classes.page}>
            <Media
              query="(max-width: 992px)"
              onChange={
                matches => this.setState({ isMobile: matches })
            }
            />
            <Grid container style={{ height: '100vh' }} justify="center" alignItems="center">
              <Grid item xs={gridSize} justify="center" style={{ textAlign: 'center', margin: '0 1em' }}>
                <Grow in>
                  <Card className={classes.formCard} id="myCheck">
                    <Content justify="center" align="center" height="4em" vmargin="1em" flex>
                      <SImg alt="" src={logo} />
                    </Content>
                    <Content width="70%" mobWidth="90%" bmargin="1.5em">
                      <SText size="27px" weight="700" color="#444444" lineHeight={1.2}>Sign In</SText>
                      <SText size="14px" weight="400" color="#999999">Sign in to your account</SText>
                    </Content>
                    <CardContent style={{ padding: isMobile ? '16px 0' : '16px' }}>
                      <div className={classes.formSpacing}>
                        <TextField
                          id="outlined-adornment-weight"
                          variant="outlined"
                          className={classes.loginInput}
                          label="Email"
                          name="email"
                          onChange={this.handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className={classes.inputIcon}>mail_outline</Icon></InputAdornment>,
                            type: 'email',
                            classes: {
                              input: classes.size,
                            },
                          }}

                          {...textFieldProps}
                        />
                      </div>
                      <div className={classes.formSpacing}>
                        <TextField
                          id="outlined-adornment-weight"
                          variant="outlined"
                          onChange={this.handleChange}
                          className={classes.loginInput}
                          label="Password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={this.showPassword}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                            classes: {
                              input: classNames(classes.size),
                            },
                          }}
                          {...textFieldProps}
                        />
                      </div>
                    </CardContent>

                    <CardActions className={classes.formActions}>
                      <div className={classes.submitWrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.loginInput}
                          disabled={loading ? true : !completeForm}
                          onClick={this.handleSubmit}
                        >
Log in
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </CardActions>
                  </Card>
                </Grow>
                <Fade in>
                  <div className="formFooter">
                    <Button color="primary" className={classes.button} onClick={() => this.props.history.push('/signup/init')}>
              Sign Up
                    </Button>
                    {/* <Button color="inherit" className={classes.button}>
              Forgot Password
                    </Button> */}
                  </div>
                </Fade>
              </Grid>
            </Grid>
            <Alert error message={alertMessage} handleClose={this.handleAlertClose} open={alertOpen} />
          </div>
        );
      }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(withStyles(styles, { withRouter: true })(Login));
