import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Menu, Tabs, Tab } from '@material-ui/core/';
import { blue } from '@material-ui/core/colors';
import WalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, MenuIcon, Typography, MenuItem, Icon
} from '../../mui';
import { styles } from '../../scss/style';
import logo from '../../assets/img/logo.png';
import { removeUser } from '../../_actions/authAction';
import { toggleClient } from '../../_actions/uiActions';
import { SText } from '../../views/Components';


class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: '',
      anchorEl: null,
      switchVal: 1
    };
    this.dispatch = props.dispatch;
  }

    handleProfileMenuOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleLogout = () => {
      this.setState({ anchorEl: null });
      this.dispatch(removeUser());
      this.props.history.push('/login');
    };

    handleSwitch = (event, newValue) => {
      this.setState({ switchVal: newValue });
      this.dispatch(toggleClient(newValue));
      this.props.history.push('/dashboard');
    }

    render() {
      const {
        classes, open, handleDrawerOpen, sidebarFixed, userInfo, history
      } = this.props;
      const { isMobile, anchorEl, switchVal } = this.state;
      return (
        <AppBar
          position="fixed"
          className={classNames({
            [classes.appBarShift]: isMobile ? false : sidebarFixed,
            [classes.appBar]: !isMobile,
            [classes.mobileAppBar]: isMobile ? true : userInfo.role !== 'admin'

          })}
        >
          <Media query="(max-width: 992px)" onChange={matches => this.setState({ isMobile: matches })} />
          <Toolbar disableGutters={false}>
            { isMobile && userInfo.role === 'admin'
                && (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                )
            }
            <img className={classes.appBarLogo} alt="" src={logo} />
            <div>
              <Typography variant="h5" color="inherit" noWrap>
                {isMobile ? 'HAS' : 'Hire A Service'}
              </Typography>
            </div>
            <div className={classes.grow} />
            <Typography variant="button" color="inherit" style={{ float: 'right' }} noWrap>
              {isMobile ? '' : ''}
            </Typography>
            <Tabs
              value={switchVal}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleSwitch}
              aria-label="disabled tabs example"
            >
              <Tab label="Client" />
              <Tab label="Service Provider" />
            </Tabs>
            <IconButton
              aria-owns={anchorEl ? 'material-appbar' : undefined}
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
              onClose={() => this.setState({ anchorEl: null })}
              style={{ marginTop: 35 }}
              classes={{ paper: classes.menu }}
            >
              <MenuItem onClick={() => { history.push('/profile'); this.setState({ anchorEl: null }); }}>
                <WalletIcon style={{ color: blue[700], marginRight: 10 }} />
                Wallet
                <SText color="#999999" size="13px" style={{ position: 'absolute', right: '15px' }}>
&#8358;
                  {userInfo.walletBal && userInfo.walletBal.toLocaleString()}
                </SText>
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>
                <Icon style={{ color: '#b71c1c', marginRight: 10 }}>exit_to_app</Icon>
                Logout
              </MenuItem>
            </Menu>

          </Toolbar>
        </AppBar>
      );
    }
}

DefaultHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DefaultHeader)));
