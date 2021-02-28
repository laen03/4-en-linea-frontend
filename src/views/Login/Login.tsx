import React, { Component } from 'react'; 
import FacebookLogin from 'react-facebook-login';
import {AuthService} from '../../services/auth.service';

import './Login.css';
export class Login extends Component {

  constructor(props:any,private authService:AuthService){
    super(props);
    this.authService = new AuthService();
  }

  loginFacebook = () =>{
    console.log('Facebook btn clicked');
  }

  responseFacebook= (response:any) => {
    console.log(response);
    if(response.status !== 'unknown'){
      this.setState({
          auth: true,
          name: response.name,
          picture: response.picture.data.url
      });
      this.authService.login({}).then( result =>{
        console.log(result)
      },error=> console.error(error));
    }
  }

  render(){
    return (
      <div className="background">
        <div className="login bg-white rounded-lg d-block position-absolute">
          <h1 className="text-center">Login</h1>
            <FacebookLogin  appId="169120591518005" autoLoad={true} fields="name,picture,email" onClick={this.loginFacebook} callback= {this.responseFacebook} />
        </div>
      </div>
    );
  }
}