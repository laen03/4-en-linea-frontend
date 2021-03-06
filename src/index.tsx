import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {
  DashboardNavigator,
  Login, 
  NotFound
} from './views/index'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        
        <Route path="/dashboard" render={({ location }) =>
                true ? (
                  <DashboardNavigator/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }/>
          
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
