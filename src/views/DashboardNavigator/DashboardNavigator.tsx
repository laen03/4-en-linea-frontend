import React, { Component } from 'react'; 
import { Route, Switch, useRouteMatch } from 'react-router';
import { Dashboard } from 'views';



import './DashboardNavigator.css';
export class DashboardNavigator extends Component {

  private path:string = '/dashboard';

  constructor(props:any){
    super(props);
  }


  render(){
    return (
      <Switch>
        <Route exact path={this.path} component={Dashboard} />
        <Route exact path={this.path+'/play/online'} component={Dashboard} />
      </Switch>
    );
  }
}