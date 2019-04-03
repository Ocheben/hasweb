import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, MenuIcon, Typography, Avatar,
        AccountCircle, MenuItem, Icon } from '../../mui';
import { Menu } from '@material-ui/core/'
import { styles} from '../../scss/style';
import Media from "react-media";
import logo from '../../assets/img/logo.png';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {removeUser} from '../../_actions/authAction'


class DefaultHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isMobile: '',
          anchorEl: null,
        };
        this.dispatch = props.dispatch
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleLogout = () => {
        this.setState({ anchorEl: null });
        this.dispatch(removeUser());
        this.props.history.push('/login');
    };
    render () {
        const {classes, open, handleDrawerOpen, sidebarFixed} = this.props
        const { isMobile, anchorEl } = this.state
        return (
            <AppBar
            position="fixed"
            className={classNames({
                [classes.appBarShift]: isMobile ? false : sidebarFixed ,
                [classes.appBar]: !isMobile,
                [classes.mobileAppBar]: isMobile

            })}
            >
            <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})}/>
            <Toolbar disableGutters={false}>
            { isMobile &&
                <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
            }
                <img className={classes.appBarLogo} alt="" src={logo}/>
                <div >
                <Typography variant="h5" color="inherit" noWrap>
                {isMobile ? 'CE' : 'Cologne Express'}
                </Typography>
                </div>
                <div className={classes.grow} />
                <Typography variant="button" color="inherit" style={{float:"right"}} noWrap>
                {isMobile ? '' : ''}
                </Typography>
                <IconButton
                    aria-owns={anchorEl? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                >
                <Icon>account_circle</Icon>
                </IconButton>
                    <Menu
                    id="material-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={()=>this.setState({ anchorEl: null })}
                    style={{marginTop:35}} classes={{paper:classes.menu}} 
                    >
                    <MenuItem onClick={this.handleLogout}><Icon style={{color:"#b71c1c", marginRight:10}} >exit_to_app</Icon>Logout</MenuItem>
                    </Menu>

            </Toolbar>
            </AppBar>
        )
    }
}

DefaultHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    return {
      userInfo: state.saveUser.userInfo
    }
  }
  
  export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DefaultHeader)));