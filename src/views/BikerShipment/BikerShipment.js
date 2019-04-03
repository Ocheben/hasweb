import React, { Component } from 'react';
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, 
        TablePagination, IconButton,
        Chip,
        Tooltip} from '@material-ui/core';
import { Card } from '../Components/styledComponents';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { red, teal, blue, amber, grey } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import FulfillModal from './FulfillModal';
import Media from "react-media";
import { BikerIcon,  DeliveredIcon, } from '../Components';



const setStatus = (status) => {
    switch(status) {
        case 'waiting' : 
        return (
            <Chip style={{backgroundColor:red[600], width:"7em"}}   label="Waiting"/>
        );
        case 'picked_up': 
        return (
            <Chip style={{backgroundColor:teal[600], width:"7em"}}  label="Picked Up"/>
        );
        case 'delivered': 
        return (
            <Chip style={{backgroundColor:blue[700], width:"7em"}}  label="Delivered"/>
        );
        case 'assigned': 
        return (
            <Chip style={{backgroundColor:amber[700], width:"7em"}}  label="Assigned"/>
        );
        default: return null
    }
}

class BikerShipment extends  Component {
    constructor(props) {
        super(props)
        this.state = {
            page:0,
            rowsPerPage: 10,
            modalOpen: false,
            itemIndex: null,
            itemName:'',
            isMobile:'',
            isPickup: false
        }
    }

    componentDidMount(){
        if(this.props.userInfo.role !== 'biker') {
          this.props.history.push('./dashboard')
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render () {
        const { page, rowsPerPage, modalOpen, itemIndex, itemName, isMobile, isPickup } = this.state
        const {shipments, classes} = this.props;
        return (
            <div>
            <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})}/>
            <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
            <Card>
            <h2 className={classes.cardHeader}>Shipments</h2>
            
            {
                shipments.length ?
                <div>
                <Table>
                <TableHead>
            <TableRow>
            <TableCell  padding="checkbox">S/N</TableCell>
            <TableCell padding="checkbox">Item</TableCell>
            {!isMobile && <TableCell>Origin</TableCell>}
            {!isMobile && <TableCell>Destination</TableCell>}
            {!isMobile && <TableCell>Pick Up Date</TableCell>}
            {!isMobile && <TableCell>Delivery Date</TableCell>}
            <TableCell align="center" padding="checkbox">Status</TableCell>
            <TableCell padding="checkbox">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {shipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index)=> (
                <TableRow key={item.id}>
                <TableCell  padding="checkbox">{index+1 + (page*rowsPerPage)}</TableCell>
                <TableCell padding="checkbox">{item.item}</TableCell>
                {!isMobile && <TableCell>{item.origin}</TableCell>}
                {!isMobile && <TableCell>{item.destination}</TableCell> }
                {!isMobile && <TableCell>{item.pickupDate}</TableCell> }
                {!isMobile && <TableCell>{item.deliverDate}</TableCell> }
                <TableCell align="center" padding="checkbox">{setStatus(item.status)}</TableCell>
                <TableCell padding="checkbox">
               { (item.status === 'assigned' || item.status === 'picked_up') &&
               <Tooltip title={item.status === 'assigned' ? 'Pick Up' : 'Deliver'} placement="bottom">
                <IconButton 
                onClick={()=>this.setState({
                    modalOpen:true, itemIndex:index+(page*rowsPerPage), 
                    itemName:item.item, isPickup: item.status==='assigned'
                })}>
                {item.status === 'assigned' ? <BikerIcon color={grey[700]} sidebarIcon/> : <DeliveredIcon color={grey[700]} sidebarIcon/>}
                </IconButton>
                </Tooltip> 
               }
               </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[ 10, 25]}
                component="div"
                count={shipments.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={isMobile ?'Rows/Page' :'Rows per page'}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                </div> :
                <h5>No Shipments</h5>
            }
            
            
            </Card>
            </Grid>
            </Grid>
            <FulfillModal open={modalOpen} handleClose={()=>this.setState({modalOpen:false})}
                itemIndex={itemIndex} itemName={itemName} isPickup={isPickup}/>
            </div>
        )
    }
}

BikerShipment.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => {
    return {
      shipments: state.saveUser.shipments,
      userInfo: state.saveUser.userInfo
    }
}

export default connect(mapStateToProps)(withStyles(styles)(BikerShipment))