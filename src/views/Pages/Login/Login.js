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
import Alert from '../../Components/Alert';
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

        if (response.meta.status === 200) {
          this.dispatch(saveUser({ ...response.data, isLoggedin: true }));
          this.props.history.push('/dashboard');
        } else {
          this.setState({
            alertOpen: true,
            alertMessage: response.meta.status === 406 ? response.meta.message
              : 'You are not connected to the internet',
            loading: false
          });
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
                    <img className={classes.logoImg} alt="" src={logo} />
                    <h5>Log in to your account</h5>
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
                    <Button color="inherit" className={classes.button} onClick={() => this.props.history.push('/register')}>
              Sign Up
                    </Button>
                    <Button color="inherit" className={classes.button}>
              Forgot Password
                    </Button>
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
  userInfo: state.saveUser.userInfo
});

export default connect(mapStateToProps)(withStyles(styles, { withRouter: true })(Login));
