import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import { styles} from '../../scss/style';
import Media from "react-media";
import {classNames, DashboardIcon, ReceiptIcon, PeopleOutlined, Button, Icon, Avatar, CssBaseline,
          List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton,
          Typography, MenuIcon, NotesIcon} from '../../mui';
import avatar from '../../assets/img/avatar.png';
import { connect } from 'react-redux';
import {removeUser} from '../../_actions/authAction'
import { BikerIcon, HistoryIcon, ShipmentIcon, HomeIcon } from '../../views/Components';

// import { }

const menuList = [
    {name: "Dashboard", icon: <HomeIcon color="#fff" sidebarIcon/>, link:"/dashboard"},
    {name: "Shipments", icon: <ShipmentIcon color="#fff" sidebarIcon/>, link:"/shipments"},
    {name: "History", icon: <HistoryIcon color="#fff" sidebarIcon/>, link:"/shipmenthistory"},
    {name: "Bikers", icon: <BikerIcon color="#fff" sidebarIcon/>, link:"/bikers"}
]

class DefaultSidebar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        isMobile:'',
        sidebarFixed: false,
        openNest: '',
        prevNest: '',
      };
      this.dispatch = props.dispatch
  }

  handleLogout = () => {
    this.dispatch(removeUser());
    this.props.history.push('/login');
  }

  fixSidebar = () => {
    this.setState({sidebarFixed: !this.state.sidebarFixed})
    this.props.fixSidebar();
  }

  onMouseLeave = () => {
    this.setState((prevState)=> ({
      openNest: '',
      prevNest: prevState.openNest
    }));
    this.props.handleDrawerClose();
  }

  onMouseEnter = () => {
    this.setState(prevState=>({openNest:prevState.prevNest}));
    this.props.handleDrawerOpen();
  }

  render() {
    const { classes, theme, open, handleDrawerClose, handleDrawerOpen, location, history, userInfo } = this.props;
    const { isMobile, sidebarFixed, openNest } = this.state
    
    return (
      <div className={classes.root}>
      <Media query="(max-width: 992px)" onChange={matches => this.setState({isMobile: matches})
        }/>
        <CssBaseline />
        <Drawer
          // className={classes.drawer}
          // variant={isMobile ? "temporary" : "persistent"}
          anchor="left"
          open={open}
          // classes={{
          //   paper: classes.drawerPaper,
          //   // root: classes.sidebar
          // }}
          onMouseEnter={!sidebarFixed ? this.onMouseEnter : undefined}
          onMouseLeave={!sidebarFixed ? this.onMouseLeave : undefined}
          variant={isMobile ? "temporary" : "permanent"}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            // [classes.drawerFixed]: !sidebarFixed
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
            isMobile ?
            <IconButton onClick={handleDrawerClose} style={{color:"#fff"}}>
              <Icon>close</Icon>
            </IconButton>
            : <IconButton onClick={this.fixSidebar} style={{color:"#fff"}}>
            {sidebarFixed ? <NotesIcon color="inherit" /> : <MenuIcon color="inherit"/>}
          </IconButton>
          }
            
          </div>
{
          <div className={classNames(classes.drawerHeader,{
            [classes.drawerHeaderClosed]: !open
          })}>
          <Avatar alt="User Avatar" src={avatar} className={classes.userAvatar}  />
          <Typography variant="subtitle2" color="inherit">{userInfo.name}</Typography>
          <Typography variant="caption" color="inherit" gutterBottom>{userInfo.email}</Typography>
          </div>
}
          <List >
            {menuList.map((item, index) => (
              <ListItem button selected={history.location.pathname === item.link ? true : false} onClick={()=>this.props.history.push(item.link)}  >
                <ListItemIcon  style={{color:"#fff", margin:0}}>{item.icon}</ListItemIcon>
                {<ListItemText primary={item.name}   classes={{primary: classes.sidebarText}}/>}
              </ListItem>
            ))}
          </List>
          <div className={classes.logoutButton}>
          <Button onClick={this.handleLogout}  style={{borderRadius: 0}} color="inherit" className={`${classes.sidebarText} fullWidth`} >
          <Icon style={{marginRight:"5px"}}>power_settings_new</Icon> {open && "Logout"} 
          </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

DefaultSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.saveUser.userInfo
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DefaultSidebar)));