import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { Card, CardContent, CardActions, TextField, Grow, Grid, ArrowForward, Fab,
    MuiPickersUtilsProvider, TimePicker, DatePicker, DateFnsUtils, MenuItem, 
    InputAdornment, LocalPhone, Visibility, VisibilityOff, IconButton, CircularProgress, Button} from '../../../mui'
import Media from "react-media";
import { getData } from '../../../_services';
import classNames from 'classnames';
import {styles} from '../../../scss/style';
import { dateFormat } from '../../../_helpers';

const modeOfId = [
    {name:"International Passport", value:"passport" },
    {name:"Driver's Licence", value:"drivers_licence" },
    {name:"National ID Card", value:"national_id" },
    {name:"Voter's Card", value:"voters_id" },
]
class CompanyOwnerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: '',
            selectedDate: new Date(),
            states: [],
            lgas: [],
            showPassword: false,
            loading: false,
            success: false,
            formInputs: {
                company_name: '', rcnumber: '', firstname: '', lastname: '', 
                email: '', address: '', state: '', lga: '', town:'', mode_of_id: '',
                id_number: '', password: '', confirm_password: '', phone: this.props.phone
            }
        }
    }
    componentDidMount = async() => {
        try {
            const response = await getData('GET', 'http://locationsng-api.herokuapp.com/api/v1/lgas');
            this.setState({states: response})
            console.log(response)
        }
        catch(e) {
            console.log(e)
        }
    }
    handleDateChange = date => {
        this.setState({
            selectedDate: date,
            formInputs: {
                ...this.state.formInputs,
                dob: dateFormat(date)
            } 
        });
    };

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        switch (name) {
            case 'state': 
            if (value !== '') {
                const lga = this.state.states.filter(item => item.alias === value)[0]
                console.log(lga.lgas)
                this.setState({
                    lgas: lga.lgas,
                    formInputs:{
                        ...this.state.formInputs,
                        [name]: value,
                    }
                });
            }
            else {
                this.setState({
                    formInputs:{
                        ...this.state.formInputs,
                        [name]: value,
                    }
                })
            }
            break
            default: 
            this.setState({
                formInputs:{
                    ...this.state.formInputs,
                    [name]: value,
                }
            });
        }
        
    };

    showPassword = () => {
        this.setState({
          showPassword: !this.state.showPassword
        })
      }

      handleButtonClick = () => {
        // this.props.history.push('/dashboard')
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true,
            },
            () => {
              this.timer = setTimeout(async() => {
                this.setState({
                  loading: false,
                  success: true,
                });
                await sessionStorage.setItem('necoJwt', this.state.formInputs.phone)
                this.props.history.push('/dashboard')
              }, 2000);
            },
          );
        }
      };
    
    render () {
        const {classes} = this.props
        const { isMobile, selectedDate, states, formInputs, lgas, showPassword, success, loading } = this.state
        const gridSize = isMobile ? 12 : 6
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

        const passwordProps = {
            InputLabelProps:{
                classes: {
                    root: classes.label,
                }
            },
            FormHelperTextProps:{
                className: "formHelper"
            }
        }


        const incompleteForm = Object.values(formInputs).every(value=>value !== '') && 
        formInputs.password === formInputs.confirm_password && !loading
        console.log(incompleteForm)
        
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grow in={true}>
            <Card className="signupForm">
            <Media query="(max-width: 992px)" onChange={
                matches => this.setState({isMobile: matches})
            }/>
            <img className={classes.logoImg} alt="" src={logo}/>
            <h5>Please provide Company Owner Information</h5>
            <CardContent>
            <Grid container>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            className={classes.textField}
            variant="outlined"
            label="Company Name"
            name="company_name"
            onChange={this.handleChange}
            {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            variant="outlined" name="rcnumber"
            label="RC Number" onChange={this.handleChange}
            className="formInput" {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            className={classes.textField}
            variant="outlined" name="firstname"
            label="First Name" onChange={this.handleChange}
            {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            variant="outlined" name="lastname"
            label="Last Name" onChange={this.handleChange}
            className="formInput" {...textFieldProps}/>
            </Grid>
            {
            // <Grid className="formSpacing" item xs={gridSize}>
            // <DatePicker margin="normal" label="Date of Birth" value={selectedDate}
            //     onChange={this.handleDateChange} variant="outlined"
            //     className="formInput datePicker" {...textFieldProps}
                
            // />
            // </Grid>
        }
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField variant="outlined" label="Email" name="email"
            className="formInput" onChange={this.handleChange} {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField variant="outlined" label="Address" name="address"
            className="formInput" onChange={this.handleChange} {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField id="select-state" variant="outlined" select label="State"
            className={classes.textField} {...textFieldProps} value={formInputs.state}
            name="state" onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {states.map(option => (
              <MenuItem key={option.alias} value={option.alias}>
              {option.state}
              </MenuItem>
              ))}
              </TextField>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField id="select-country" variant="outlined" select label="LGA"
            className={classes.textField} value={formInputs.lga} name="lga"
            onChange={this.handleChange} {...textFieldProps}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {lgas.map(option => (
              <MenuItem key={option} value={option}>
              {option}
              </MenuItem>
              ))}
              </TextField>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField variant="outlined" label="Town" className="formInput"
            name="town" onChange={this.handleChange} {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField id="mode_of_id" variant="outlined" select label="Mode of Identification"
            className={classes.textField} value={formInputs.mode_of_id} name="mode_of_id"
            onChange={this.handleChange} {...textFieldProps}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {modeOfId.map(option => (
              <MenuItem key={option.value} value={option.value}>
              {option.name}
              </MenuItem>
              ))}
              </TextField>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField variant="outlined" label="ID Number" className="formInput"
            name="id_number" onChange={this.handleChange} {...textFieldProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            id="outlined-adornment-weight"
            variant="outlined" onChange={this.handleChange}
            className={classes.textField}
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={this.showPassword}>
                {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
                </InputAdornment>
              ),
              classes: {
                input: classNames(classes.size),
            },
            }}
            {...passwordProps}/>
            </Grid>
            <Grid className="formSpacing" item xs={gridSize}>
            <TextField
            id="outlined-adornment-weight"
            variant="outlined" onChange={this.handleChange}
            className={classes.textField}
            label="Confirm Password"
            name="confirm_password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={this.showPassword}>
                {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
                </InputAdornment>
              ),
              classes: {
                input: classNames(classes.size),
            },
            }}
            {...passwordProps}/>
            </Grid>
            </Grid>
            </CardContent>
            <CardActions className="formActionsb">
            <div className={classes.submitWrapper}>
            <Button
                variant="contained"
                color="primary"
                className={classes.loginInput}
                disabled={!incompleteForm }
                onClick={this.handleButtonClick}
            >Sign Up</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            </CardActions>
            </Card>
            </Grow>
            </MuiPickersUtilsProvider>
        )
    }
}
CompanyOwnerInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withRouter(withStyles(styles)(CompanyOwnerInfo))
