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
      <div className={style.background}>
        <nav className='navbar navbar-dark bg-dark'>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to={this.path}>
              <img src={logo} width="30" height="30" className="d-inline-block align-top"></img>
                N en línea
            </NavLink>
            <NavLink className="navbar-brandnav-link active" to='/'>
            Logout
            </NavLink>
            
          </div>
        </nav>
        <Switch>
          <Route exact path={this.path} component={Dashboard} />
          <Route exact path={this.path + '/play'} component={GameRoom} />
        </Switch>
      </div>

    );
  }
}