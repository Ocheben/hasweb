import React, { Component } from 'react';
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, 
        TablePagination, IconButton,
        TableFooter,
        Badge,
        Chip} from '@material-ui/core';
import { Card } from '../Components/styledComponents';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { red, teal, green, blue, amber, grey } from '@material-ui/core/colors';
import { ActionsIcon } from '../Components';
import { connect } from 'react-redux';
import AssignModal from './AssignModal'
import { stat } from 'fs';



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

class Shipments extends  Component {
    constructor(props) {
        super(props)
        this.state = {
            page:0,
            rowsPerPage: 10,
            modalOpen: false,
            itemIndex: null
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
        const { page, rowsPerPage, modalOpen, itemIndex } = this.state
        const {shipments} = this.props;
        return (
            <div>
            <Card>
            <Table>
            <TableHead>
            <TableRow>
            <TableCell  padding="checkbox">S/N</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell align="center" padding="checkbox">Status</TableCell>
            <TableCell padding="checkbox">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {shipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index)=> (
                <TableRow key={item.id}>
                <TableCell  padding="checkbox">{index+1 + (page*rowsPerPage)}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.origin}</TableCell>
                <TableCell>{item.destination}</TableCell>
                <TableCell>{item.assignee}</TableCell>
                <TableCell align="center" padding="checkbox">{setStatus(item.status)}</TableCell>
                <TableCell padding="checkbox">
                <IconButton onClick={()=>this.setState({modalOpen:true, itemIndex:index+(page*rowsPerPage)})}>
                <ActionsIcon color={grey[700]}/>
                </IconButton>
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
            <AssignModal open={modalOpen} handleClose={()=>this.setState({modalOpen:false})}
                itemIndex={itemIndex}/>
            </div>
        )
    }
}

Shipments.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => {
    return {
      shipments: state.saveUser.shipments,
      userInfo: state.saveUser.userInfo
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Shipments))