import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Dashboard,GameRoom } from 'views';
import logo from './dashboardIcon.png';
import style from './DashboardNavigator.module.css';
export class DashboardNavigator extends Component {

  private path: string = '/dashboard';

  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <div>
        <nav className='navbar navbar-dark bg-dark'>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to={this.path}>
              <img src={logo} width="30" height="24" className="d-inline-block align-top"></img>
              N en línea
            </NavLink>
            <a className="nav-link active">Logout</a>
          </div>
        </nav>
        <Switch>
          <Route exact path={this.path} component={Dashboard} />
          <Route exact path={this.path + '/play/online'} component={GameRoom} />
        </Switch>
      </div>

    );
  }
}