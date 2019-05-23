import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../../assets/img/logo.png'
import MediaQuery from 'react-responsive';
import { Row, Col } from 'reactstrap';
import { Grid, Card, CardHeader, CardContent, CardActions, MenuItem, TextField,
        DeleteIcon, Icon, Fab, SendIcon, ArrowForward, Avatar, Slide, CircularProgress,
        green, CheckIcon, InputAdornment, LocalPhone, Visibility, VisibilityOff, IconButton,
        Grow, classNames, Link, Button, Fade } from '../../../mui'
import { Stepper } from '../../Components';
import {styles} from '../../../scss/style';
import {phoneValidation} from '../../../_helpers';
import {getData, URLS, METHODS} from '../../../_services';
import {saveUser} from '../../../_actions/authAction'

const steps = [
  'Phone',
  'OTP'
]
class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      loading: false,
      showPassword: false,
      formInputs: {phone:'', email:'ocheben@gmail.com', otp:''},
      formValidity: {}
    }
  }
  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    switch(name) {
      case 'phone':
      if(phoneValidation(e)) {
        this.setState({
          formValidity: {
            ...this.state.formValidity,
            [name]: true
          },
          formInputs: {
            ...this.state.formInputs,
            [name]: value
          }
        })
      }
      else {
        this.setState({
          formValidity: {
            ...this.state.formValidity,
            [name]: false
          },
          formInputs: {
            ...this.state.formInputs,
            [name]: ''
          }
        })
      }
      break;
      case 'otp': 
      this.setState({
        formInputs: {
          ...this.state.formInputs,
          [name]: value.length === 4 ? value : ''
        }
      })
      break;
      default: return ''
    }
  }

  getPage = (activeStep) => {
    this.setState({
      inputs: {...this.state.inputs,
        activeStep}
    })
  }

  handleNext = async() => {
    const { activeStep, formInputs } = this.state
    console.log('handling next')
    this.setState({loading: true})
      if(activeStep === 0) {
        console.log(`active step is ${activeStep}`)
        const {phone, email} = this.state.formInputs
        const data = {"phone": `+234${phone}`, "email":email}
        const response = await getData(METHODS.SIGNUPINIT, URLS.SIGNUPINIT, data);
        console.log(response)
        
        if (response.meta.status === 200){
          // this.dispatch(saveUser({...response, isLoggedin:true}));
          // this.props.history.push('/dashboard')
          this.setState({
            activeStep: activeStep + 1,
            loading: false
          })
        }
        else  {
          this.setState({
            alertOpen:true,
            alertMessage: response.status===404 ? 'Invalid username or password' :
             'You are not connected to the internet',
            loading:false
          })
        }
      }
      else {
        const {phone, otp} = this.state.formInputs
        this.setState({loading:true})
        const data = {"phone": `+234${phone}`, "otp":otp}
        const response = await getData(METHODS.SIGNUPVERIFY, URLS.SIGNUPVERIFY, data);
        console.log(response)
        
        if (response.meta.status === 200){
          // this.dispatch(saveUser({...response, isLoggedin:true}));
          // this.props.history.push('/dashboard')
          this.props.verifyPhone(formInputs.phone)
          this.setState({
            activeStep: activeStep + 1,
            loading: false
          })
        }
        else  {
          this.setState({
            alertOpen:true,
            alertMessage: response.status===404 ? 'Invalid username or password' :
             'You are not connected to the internet',
            loading:false
          })
        }
      }
    
  }

  showPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  
    render () {
        const { classes } = this.props;
        const { activeStep, loading, showPassword, formValidity, formInputs} = this.state
        const textFieldProps = {
          InputLabelProps:{
              classes: {
                  root: classes.label,
              }
          },
          FormHelperTextProps:{
              className: "formHelper"
          }
        }
        const disableButton = activeStep === 0 ? !formInputs.phone : !formInputs.otp
        
        return (
          <Grow in>
          <div>
          <Card className="formCard">
          <img className={classes.logoImg} alt="" src={logo}/>
          <h5>Verify Your Phone Number</h5>
          <CardContent>
          <Stepper width="80%" activeStep={activeStep} steps={steps} getPage={(activeStep)=> this.getPage(activeStep)}  />
          <div className="verticalPadding">
          <Slide in={activeStep === 0} direction="right" mountOnEnter unmountOnExit>
          <div>
          <TextField
          id="outlined-adornment-weight"
          variant="outlined"
          className="phoneInput"
          label="Phone" name="phone"
          error={("phone" in formValidity) && !formValidity.phone}
          onChange={this.handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end"><LocalPhone className="inputIcon"/></InputAdornment>,
            type: "number",
            width:"50%",
            classes: {
              input: classes.size,
            },
          }}
          {...textFieldProps}/>
          </div>
          </Slide>
          <Slide in={activeStep === 1} direction="left" mountOnEnter unmountOnExit>
          <div >
          <TextField
          id="outlined-adornment-weight"
          variant="outlined"
          className="phoneInput"
          label="OTP" name="otp" onChange={this.handleChange}
          type='number' 
          onInput={(e)=>{ 
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
        }}
          InputProps={{
            // endAdornment: (
            //   <InputAdornment position="end">
            //   <IconButton onClick={this.showPassword}>
            //   {showPassword ? <VisibilityOff/> : <Visibility/>}
            //   </IconButton>
            //   </InputAdornment>
            // ),
            classes: {
              input: classNames(classes.size, classes.otp),
          },
          maxLength: "4",
            inputProps: {
              maxLength: 4
            }
          }}
          {...textFieldProps}/>
          </div>
          </Slide>
          </div>
            </CardContent>
            <CardActions className={`${classes.actions} formActions`}>
            <div className={classes.fabWrapper}>
            <Fab className="formButton"color="primary" onClick={() => this.handleNext()} disabled={disableButton}>
            {activeStep === 2 ? <CheckIcon/> : <ArrowForward/>}
            </Fab>
            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
            </CardActions>
            </Card>
            <Fade in>
              <div className="formFooter">
              <Link to="/login" style={{ color: "#616161" }}>
              <Button color="inherit" className={classes.button} >
              Sign In
              </Button>
              </Link>
              </div>
              </Fade>
              </div>
            </Grow>
            )
    }
}

PhoneInput.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PhoneInput)