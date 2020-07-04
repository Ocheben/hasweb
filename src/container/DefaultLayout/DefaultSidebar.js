import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Media from 'react-media';
import { connect } from 'react-redux';
import { styles } from '../../scss/style';
import {
  classNames, Icon, Avatar, CssBaseline,
  List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton,
  Typography, MenuIcon, NotesIcon
} from '../../mui';
import avatar from '../../assets/img/avatar.png';
import { removeUser } from '../../_actions/authAction';
import {
  BikerIcon, HistoryIcon, ShipmentIcon, HomeIcon
} from '../../views/Components';


class DefaultSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMobile: '',
      sidebarFixed: false,
      openNest: '',
      prevNest: '',
    };
    this.dispatch = props.dispatch;
  }

  handleLogout = () => {
    this.dispatch(removeUser());
    this.props.history.push('/login');
  }

  fixSidebar = () => {
    this.setState({ sidebarFixed: !this.state.sidebarFixed });
    this.props.fixSidebar();
  }

  onMouseLeave = () => {
    this.setState(prevState => ({
      openNest: '',
      prevNest: prevState.openNest
    }));
    this.props.handleDrawerClose();
  }

  onMouseEnter = () => {
    this.setState(prevState => ({ openNest: prevState.prevNest }));
    this.props.handleDrawerOpen();
  }

  render() {
    const {
      classes, open, handleDrawerClose, history, userInfo, userType
    } = this.props;
    const { isMobile, sidebarFixed, } = this.state;

    const menuList = userType === 'seller' ? [
      { name: 'Dashboard', icon: <HomeIcon color="#fff" sidebarIcon />, link: '/dashboard' },
      { name: 'Browse Jobs', icon: <ShipmentIcon color="#fff" sidebarIcon />, link: '/jobs' },
      { name: 'Bids', icon: <HistoryIcon color="#fff" sidebarIcon />, link: '/bids' },
      { name: 'Profile', icon: <BikerIcon color="#fff" sidebarIcon />, link: '/profile' }
    ] : [
      { name: 'Dashboard', icon: <HomeIcon color="#fff" sidebarIcon />, link: '/dashboard' },
      { name: 'My Jobs', icon: <ShipmentIcon color="#fff" sidebarIcon />, link: '/myjobs' },
      { name: 'Profile', icon: <BikerIcon color="#fff" sidebarIcon />, link: '/profile' }
    ];

    return (
      <div className={classes.root}>
        <Media
          query="(max-width: 992px)"
          onChange={matches => this.setState({ isMobile: matches })
        }
        />
        <CssBaseline />
        <Drawer
          anchor="left"
          open={open}
          onMouseEnter={!sidebarFixed ? this.onMouseEnter : undefined}
          onMouseLeave={!sidebarFixed ? this.onMouseLeave : undefined}
          variant={isMobile ? 'temporary' : 'permanent'}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.drawerToggle}>
            {
            isMobile
              ? (
                <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
                  <Icon>close</Icon>
                </IconButton>
              )
              : (
                <IconButton onClick={this.fixSidebar} style={{ color: '#fff' }}>
                  {sidebarFixed ? <NotesIcon color="inherit" /> : <MenuIcon color="inherit" />}
                </IconButton>
              )
          }

          </div>
          {
            <div className={classNames(classes.drawerHeader, {
              [classes.drawerHeaderClosed]: !open
            })}
            >
              <Avatar alt="User Avatar" src={avatar} className={classes.userAvatar} />
              <Typography variant="subtitle2" className={classes.sidebarAvatarText} color="inherit">{`${userInfo.firstname} ${userInfo.lastname}`}</Typography>
              <Typography variant="caption" className={classes.sidebarAvatarText} color="inherit" gutterBottom>{userInfo.email}</Typography>
            </div>
}
          <List>
            {menuList.map(item => (
              <ListItem button selected={history.location.pathname === item.link} onClick={() => this.props.history.push(item.link)}>
                <ListItemIcon style={{ color: '#fff', margin: 0 }}>{item.icon}</ListItemIcon>
                {<ListItemText primary={item.name} classes={{ primary: classes.sidebarText }} />}
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

DefaultSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo,
  userType: state.uiReducer.userType
});

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DefaultSidebar)));
