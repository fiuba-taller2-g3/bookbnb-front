import React, { Component } from 'react';
import "./login.scss";
import loginImg from "./login.png";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      errorMessage: '',
      open: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
    this.handleData = this.handleData.bind(this)

  }

  handleData()  {
    if((this.state.email !== "") && (this.state.password !== "")) {
      this.setState({buttonDisabled : "enabled"})
    } else {
      this.setState({buttonDisabled : ''})
    }
  }

  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleApiResponse(response) {
    this.setState({open: false})
    if (response.error) {
        this.setState({errorMessage: response.error})
    } else {
        localStorage.setItem("token", response.api_token);
        this.props.history.push("/home");
    }
  }

  handleSubmit() {
    this.setState({open: true})
    const url =`https://facade-server-develop.herokuapp.com/admins/login`
    const requestConfig = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({email: this.state.email, password: this.state.password}),
        headers: {'Content-Type': 'application/json'}
    };

    fetch(url, requestConfig).then(response => response.json()).then(this.handleApiResponse);
  }

  render(){
    return (
      <div>
        <div className="base-container-login">
            <div className="header">Login</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} alt="login admin"/>
              </div>
              <div className="form">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Correo electrónico" onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                  <input type="password" name="password" placeholder="Contraseña" onChange={this.handleInputChange}></input>
                </div>
                <button className=" button-login button-login-intro" onClick={this.handleSubmit}>Iniciar sesión</button>
                <p>{this.state.errorMessage}</p>
              </div>
              <Backdrop className="backdrop" open={this.state.open}>
               <CircularProgress color="inherit" />
              </Backdrop>
            </div>
        </div>
      </div>
    );
  }
} 
export default (Login)