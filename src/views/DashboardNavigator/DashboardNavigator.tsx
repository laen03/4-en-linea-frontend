import React, { Component } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Dashboard } from 'views';



import './DashboardNavigator.css';
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
            <a className="navbar-brand" href="#">
              <img src="/src/views/Dashboard/dashboardIcon.png" alt="" width="30" height="24" className="d-inline-block align-top"></img>
              N en línea
            </a>
            <a className="nav-link active" aria-current="page" href="#">Logout</a>
          </div>
        </nav>
        <Switch>
          <Route exact path={this.path} component={Dashboard} />
          <Route exact path={this.path + '/play/online'} component={Dashboard} />
        </Switch>
      </div>

    );
  }
}