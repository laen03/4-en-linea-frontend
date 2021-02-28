import React, { Component } from 'react'; 
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {login,register} from '../../services/auth.service';

import './Login.css';


export class Login extends Component {

  constructor(props:any){
    super(props);
  }

  loginFacebook = () =>{
    console.log('Facebook btn clicked');
  }

  responseGoogle = ( response:any)=>{
    console.log(response);
    console.log(response.profileObj);
  }

  responseFacebook= (response:any) => {
    console.log(response);
    if(response.status !== 'unknown'){
      this.setState({
          auth: true,
          name: response.name,
          picture: response.picture.data.url
      });
    }
  }

  

  render(){
    return (
      <div className="background">
        <div className="login bg-white rounded-lg d-block position-absolute">
          <h1 className="text-center">Login</h1>

            <FacebookLogin  
            appId="169120591518005" 
            cssClass = "btn btn-primary rounded-lg shadow btn-lg btn-block mx-auto w-25" 
            fields="name,picture,email" 
            onClick={this.loginFacebook} 
            callback= {this.responseFacebook}
            textButton= "Facebook"/>

            <GoogleLogin
            clientId="458119816447-ccej9rk4dflmdtjgf3ftds65knufin2s.apps.googleusercontent.com"
            buttonText="Google"
            className = "rounded-lg d-block d-grid gap-2 col-6 mx-auto w-25" 
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}/>
        </div>
      </div>
    );
  }
}