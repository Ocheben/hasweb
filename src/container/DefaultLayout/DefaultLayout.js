/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch, } from 'react-router-dom';
import { connect } from 'react-redux';
import Media from 'react-media';
import routes from '../../routes';
import DefaultSidebar from './DefaultSidebar';
import { DefaultHeader } from './index';
import { classNames, CssBaseline } from '../../mui';
import { styles } from '../../scss/style';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      sidebarFixed: false,
      isMobile: ''
    };
  }

  componentDidMount() {
    if (!this.props.userInfo.isLoggedin) {
      this.props.history.push('/login');
    }
  }

    fixSidebar = () => {
      this.setState({ sidebarFixed: !this.state.sidebarFixed });
    }

    handleDrawerOpen = () => {
      this.setState({ drawerOpen: true });
    };

    handleDrawerClose = () => {
      this.setState({ drawerOpen: false });
    };

    render() {
      const { classes, userInfo } = this.props;
      const { drawerOpen, sidebarFixed, isMobile } = this.state;

      return (
        <div className={classes.root}>
          <Media query="(max-width: 992px)" onChange={matches => this.setState({ isMobile: matches })} />
          <CssBaseline />
          {userInfo.role === 'admin' && <DefaultSidebar handleDrawerOpen={this.handleDrawerOpen} handleDrawerClose={this.handleDrawerClose} open={drawerOpen} fixSidebar={this.fixSidebar} />}
          <DefaultHeader handleDrawerOpen={this.handleDrawerOpen} open={drawerOpen} sidebarFixed={sidebarFixed} />
          <Container
            className={classNames({
              [classes.contentShift]: sidebarFixed,
              [classes.content]: !isMobile,
              [classes.mobileContent]: isMobile ? true : userInfo.role !== 'admin'
            })}
            //    className={classes.content}
            fluid
          >
            <Switch>
              {routes.map((route, idx) => (route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <route.component {...props} />
                  )}
                />
              ) : (null)))}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Container>
        </div>

      );
    }
}
DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userInfo: state.saveUser.userInfo
});

export default connect(mapStateToProps)(withStyles(styles)(DefaultLayout));
