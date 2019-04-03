import React, { Component } from 'react';
import { BikerIcon, ShipmentIcon, DeliveredIcon, AssignedIcon } from '../Components';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '../Components/styledComponents';
import { Grid, } from '../../mui';
import {blue, teal, amber, red, grey} from '@material-ui/core/colors/'
import {styles} from '../../scss/style';
import { Bar, Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import Media from "react-media";
class Dashboard extends  Component {
  constructor (props) {
    super(props)
    this.state = {
      isMobile: ''
    }
  }
  componentDidMount(){
    if(this.props.userInfo.role !== 'admin') {
      this.props.history.push('./bikershipment')
    }
  }
    render () {
        const {classes, dashStatus} = this.props
        const {isMobile} = this.state
        const barData = {
            labels: ['Delivered', 'Picked Up', 'Assigned', 'Waiting'],
            datasets: [
              {
      
                backgroundColor: [
                    blue[600],
                    teal[600],
                    amber[300],
                    red[600],
                ],
                borderColor: [
                    blue[600],
                    teal[600],
                    amber[300],
                    red[600],
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    blue[600],
                    teal[600],
                    amber[300],
                    red[600],
                ],
                hoverBorderColor: [
                  blue[800],
                  teal[800],
                  amber[500],
                  red[700],
                ],
                data: [dashStatus.delivered, dashStatus.picked_up, dashStatus.assigned, dashStatus.waiting],
              },
            ],
          };

        const barOptions = {
            tooltips: {
              enabled: false,
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: dashStatus.shipments
                }
              }]
            },
            legend: {
              display: false,
            },
          }
      
        return (
            <div>
            <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})}/>
            <Grid container spacing={24}>
            <Grid item xs={isMobile? 12: 3}>
            <Card button color={grey[500]}>
            <ShipmentIcon float="right" color={grey[700]}/>
            <h3 className={classes.cardButtonHeader}>Shipments</h3>
            <h1 className={classes.cardButtonValue}>{dashStatus.shipments}</h1>
            </Card>
            </Grid>
            <Grid item xs={isMobile? 12: 3}>
            <Card button color={blue[700]}>
            <DeliveredIcon float="right" color={grey[700]}/>
            <h3 className={classes.cardButtonHeader}>Delivered</h3>
            <h1 className={classes.cardButtonValue}>{dashStatus.delivered}</h1>
            </Card>
            </Grid>
            <Grid item xs={isMobile? 12: 3}>
            <Card button color={teal[600]}>
            <BikerIcon float="right" color={grey[700]}/>
            <h3 className={classes.cardButtonHeader}>Picked Up</h3>
            <h1 className={classes.cardButtonValue}>{dashStatus.picked_up}</h1>
            </Card>
            </Grid>
            <Grid item xs={isMobile? 12: 3}>
            <Card button color={amber[300]}>
            <AssignedIcon float="right" color={grey[700]}/>
            <h3 className={classes.cardButtonHeader}>Assigned</h3>
            <h1 className={classes.cardButtonValue}>{dashStatus.assigned}</h1>
            </Card>
            </Grid>
            <Grid item xs={isMobile? 12: 6}>
            <Card>
            <h2 className={classes.cardHeader}>Bar Chart</h2>
            <Bar
                data={barData}
                width={100}
                height={50}
                options={barOptions}
                />
            </Card>
            </Grid>
            <Grid item xs={isMobile? 12: 6}>
            <Card>
            <h2 className={classes.cardHeader}>Doughnut Chart</h2>
            <Doughnut data={barData} className="animated fadeIn" />
            </Card>
            </Grid>
            </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.saveUser.userInfo,
    dashStatus: state.saveUser.dashStatus
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))