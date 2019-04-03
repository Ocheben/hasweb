import React, { Component } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, 
        TablePagination, Chip} from '@material-ui/core';
import { Card } from '../Components/styledComponents';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { red, teal, blue, amber, } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Media from "react-media";



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

class History extends  Component {
    constructor(props) {
        super(props)
        this.state = {
            page:0,
            rowsPerPage: 10,
            modalOpen: false,
            itemIndex: null,
            isMobile:''
        }
    }

    componentDidMount(){
        if(this.props.userInfo.role !== 'admin') {
          this.props.history.push('./bikershipment')
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render () {
        const { page, rowsPerPage, isMobile } = this.state
        const {shipments, classes} = this.props;
        const deliveredList = shipments.filter(item=> item.status === 'delivered')
        return (
            <div>
            <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})}/>
            <Card>
            <h2 className={classes.cardHeader}>History</h2>
            <Table>
            <TableHead>
            <TableRow>
            <TableCell  padding="checkbox">S/N</TableCell>
            <TableCell>Item</TableCell>
            {!isMobile &&<TableCell>Origin</TableCell>}
            {!isMobile &&<TableCell>Destination</TableCell>}
            <TableCell>Assignee</TableCell>
            <TableCell align="center" padding="checkbox">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {deliveredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index)=>
                        <TableRow key={item.id}>
                        <TableCell  padding="checkbox">{index+1 + (page*rowsPerPage)}</TableCell>
                        <TableCell>{item.item}</TableCell>
                        {!isMobile &&<TableCell>{item.origin}</TableCell>}
                        {!isMobile &&<TableCell>{item.destination}</TableCell>}
                        <TableCell>{item.assignee}</TableCell>
                        <TableCell align="center" padding="checkbox">{setStatus(item.status)}</TableCell>
                        </TableRow>
                        )}
            </TableBody>
            
            </Table>
            <TablePagination
                rowsPerPageOptions={[ 10, 25]}
                component="div"
                count={deliveredList.length}
                rowsPerPage={rowsPerPage}
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
            </Card>
            </div>
        )
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => {
    return {
      shipments: state.saveUser.shipments,
      userInfo: state.saveUser.userInfo
    }
}

export default connect(mapStateToProps)(withStyles(styles)(History))