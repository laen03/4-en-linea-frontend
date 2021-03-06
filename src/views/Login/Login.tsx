import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { NavLink, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { login, facebook,google } from '../../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';

import './Login.css';
export class Login extends Component {

  private validator: SimpleReactValidator;
  state:any;
  delta: any;


  constructor(props: any) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.state = {
      email:'',
      password:'',
      redirect:false,
      login:false
    };
    this.formChange = this.formChange.bind(this);
    this.onClickThirdParty = this.onClickThirdParty.bind(this);
  }

  private onClickThirdParty(){
    toast.info("Logueando",{position:'bottom-right',autoClose:1500,pauseOnHover: false,draggable: false});
    this.setState({login:true});
  }

  private responseFacebook = (response: any) => {
    facebook(response.userID,response.accessToken,response.email).then( result => {
      if(result.success){
        this.setState({redirect:true});
      }
      toast.error("Credenciales Invalidas",{position:'bottom-right'});
      this.setState({login:false});
    },err => toast.error("Error Interno",{position:'bottom-right'}))
  
  }

  private responseGoogle = (response: any) => {
    if (response.status !== 'unknown') {
      console.log(response);
    }
  }

  private onSubmitForm = (event:any) => {
    event.preventDefault();
    this.setState({login:true});
    toast.info("Logueando",{position:'bottom-right',autoClose:1500,pauseOnHover: false,draggable: false});
    this.login();
  }

  private login(){
    login({email:this.state.email,password:this.state.password}).then( result =>{
      if(result.success){
        this.setState({redirect:true});
      }
      toast.error("Credenciales Invalidas",{position:'bottom-right'});
      this.setState({login:false});
    },err => toast.error("Error Interno",{position:'bottom-right'}))
  }

  private formChange(event:any){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect push to='/dashboard' />
    }
  }

  render() {
    return (
      <div className="background">
        {this.renderRedirect()}
        <ToastContainer />
        <div className="login bg-white rounded-lg d-block position-absolute">
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12">
                <h1 className="text-center w-100 login-text">Entrar</h1>
              </div>
            </div>
            <form onSubmit={this.onSubmitForm}>
              <div className="row mt-2">
                <div className="col-12">
                  <label>Correo</label>
                  <input required name="email" type="email" value={this.state.email} onChange={this.formChange}  placeholder="ejemplo@correo.com" className="form-control"/>
                  {this.validator.message('email', this.state.email, 'required|email',{ className: 'text-danger' })}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <label>Contraseña</label>
                  <input required name="password" type="password" value={this.state.password} onChange={this.formChange}  className="form-control"/>
                  {this.validator.message('password', this.state.password, 'required|min:8|max:20',{ className: 'text-danger' })}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <button type="submit" disabled={!this.validator.allValid()} className="btn btn-success btn-block">Login</button>
                </div>
              </div>
            </form>
            <div className="row mt-3">
              <div className="col-12">
                <FacebookLogin
                  isDisabled={this.state.login}
                  onClick={this.onClickThirdParty}
                  appId="169120591518005"
                  cssClass=" btn btn-block btn-primary"
                  fields="name,picture,email"
                  callback={this.responseFacebook}
                  textButton="Login con Facebook" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <GoogleLogin
                  disabled={this.state.login}
                  clientId="458119816447-ccej9rk4dflmdtjgf3ftds65knufin2s.apps.googleusercontent.com"
                  buttonText="Login con Google"
                  className="btn btn-block"
                  onSuccess={this.responseGoogle}
                  cookiePolicy={'single_host_origin'} />
              </div>
            </div>
            <div className="row mt-2 mb-5">
                <div className="col-12">
                  <NavLink className="text-center w-100 d-block" to="/Register">¿No tienes una cuenta?</NavLink>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}