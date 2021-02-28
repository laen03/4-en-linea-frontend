import React, { Component } from 'react';
import styled from 'styled-components'; 

const Contenedor = styled.div`
  color: green;
  text-align: center;
`;

class LoginFacebook extends Component{

  constructor(props){
    super(props);
    this.state = {
      loggedStatus: false
    }
  }

  componentDidMount(){
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : '169120591518005',
        xfbml      : true,
        version    : 'v10.0'
      });

      window.FB.Event.subscribe("auth.statusChange", response => {
        this.statusChangeCallback(response);
      });

      this.checkLoginStatus();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  statusChangeCallback(response){
    console.log(response);
    if(response.status === "connected"){
      this.setState({
        loggedStatus: true,
        userID: response.authResponse.userID
      });
      this.getPersonalData();
    } else {
      this.setState({
        loggedStatus: false
      });
    }
  }

  checkLoginStatus(){
    window.FB.getLoginStatus(response => {this.statusChangeCallback(response)});
  }

  getPersonalData(){
    var url = "/" + this.state.userID + "?fields=name,picture,first_name";
    window.FB.api(url, response =>{
      console.log(response);
      this.setState({
        name: response.name,
        picture: response.picture.data.url,
        email: response.first_name
      });
    });
  }

  showPersonalData(){
    if(this.state.loggedStatus){
      return(
        <div>
        <p>Bienvenido, {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <img src={this.state.picture} alt="foto no encontrada"/>
        </div>
      );
    } else {
      return(
        <p>No esta conectado  </p>
      )
    }
  }
  
  render() {
    return (  
      <Contenedor>
        <h1>Login to Play N-lines</h1>
        {this.showPersonalData()}
          <div className="fb-login-button" 
            data-width="" 
            data-size="large" 
            data-button-type="continue_with" 
            data-layout="rounded" 
            data-auto-logout-link="true" 
            data-use-continue-as="false">  
          </div>
      </Contenedor>
    );
  }
}

export default LoginFacebook;
