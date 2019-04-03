import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, 
        TablePagination, } from '@material-ui/core';
import { Card } from '../Components/styledComponents';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { connect } from 'react-redux';


class Bikers extends  Component {
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
        const { page, rowsPerPage } = this.state
        const {bikers, classes} = this.props;
        return (
            <div>
            <Card>
            <h2 className={classes.cardHeader}>Bikers</h2>
            <Table>
            <TableHead>
            <TableRow>
            <TableCell  padding="checkbox">S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bikers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index)=> (
                <TableRow key={item.bikerid}>
                <TableCell  padding="checkbox">{index+1 + (page*rowsPerPage)}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            
            </Table>
            <TablePagination
                rowsPerPageOptions={[ 10, 25]}
                component="div"
                count={bikers===Array ? bikers.length :0}
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

Bikers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => {
    return {
      bikers: state.saveUser.bikers,
      userInfo: state.saveUser.userInfo
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Bikers))