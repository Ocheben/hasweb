import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import PhoneInput from './PhoneInput';
import CompanyOwnerInfo from './CompanyOwnerInfo'
import Media from "react-media";
// import logo from '../../../assets/img/nlogo.svg'
import { Grow } from '../../../mui';

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: "100%",
        // height: "50px"
      },
      menu: {
        width: 200,
      },
      label:{
          fontSize: "14px",
          transform: "translate(14px, 12px)",
          marginTop: "0px"
      },
      size:{
          fontSize: "14px",
        padding: "0.8em"
      },
})

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifiedPhone: false,
            isMobile:''
        }
    }
    verifyPhone = (phone) => {
        this.setState({
            verifiedPhone: true,
            phone
        })
    }
    render () {
        const {verifiedPhone, isMobile} = this.state
        const currentPage = verifiedPhone ? <CompanyOwnerInfo phone={this.state.phone}/> : <PhoneInput verifyPhone={this.verifyPhone}/>
        const gridSize = isMobile ? 12 : verifiedPhone ? 6 : 4
        console.log(gridSize)
        return (
            <div className="page">
            <Media query="(max-width: 992px)" onChange={
                matches => this.setState({isMobile: matches})
            }/>
            <Grid container style={{minHeight:"100vh", overflow:"scroll"}}  justify="center" alignItems="center" >
            <Grid item xs={gridSize}>{currentPage}</Grid>
            </Grid>
            </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Register