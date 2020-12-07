import React, { Component } from 'react';
import "./register.scss";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import tokenChecker from '../../utils/TokenChecker';
import validate from '../../utils/RegisterValidator';
import { withSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import createHistory from 'history/createBrowserHistory'


export const history = createHistory()

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

 class Register extends Component {

  constructor(props){
    super(props)
    this.state = {
      errors:{},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
    this.handleAlertStatus = this.handleAlertStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const input = event.target;
    this.setState({[input.name]: input.value});
  }

  handleApiResponse(response) {
    if (response.error) {
      this.handleAlertStatus(response.error, 'error' )
    } 
    else {
        this.handleAlertStatus(response.msg, 'success' )
    }
  }

  handleLogout(){
    history.push("/")
    this.handleAlertStatus('Caduco la sesión, inicie sesión nuevamente', 'info' )
    sleep(1500).then(() => {
      window.location.reload();
    })
  }

  handleAlertStatus = (message, status) => {
    this.props.enqueueSnackbar(message, {variant: status})
  }

  handleSubmit = e => {
    e.preventDefault()
    const { errors, ...whitoutErrors } = this.state
    const result = validate(whitoutErrors)
    this.setState({ errors: result })

    if (!Object.keys(result).length) {
      if (tokenChecker()) {
        const token = localStorage.getItem("token")
        //Enviar formulario de registro
        console.log("formulario valido")
        const url =`https://facade-server-develop.herokuapp.com/admins`
        const requestConfig = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
              name: this.state.name,
              surname: this.state.surname,
              dni: this.state.dni,
              email: this.state.email, 
              password: this.state.password
            }),
            headers: {
              'Content-Type': 'application/json',
              'API_TOKEN': token
          }
        };
        fetch(url, requestConfig).then(response => response.json()).then(this.handleApiResponse);
        e.target.reset()
      }
      else {
        this.handleLogout()
      }
    }
  }

  componentDidMount() {
    if (!tokenChecker()) {
      this.handleLogout()
    }
  }

  render(){
    const { errors } = this.state

    return (
      <div className="base-container">
         <Typography variant="h4" gutterBottom>Crear nuevo administrador</Typography>
          <div className="content">
            <div className="form">
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextField  error={errors.name} type="text" name="name" id="register-name" label="Nombre" variant="outlined" onChange={this.handleInputChange} />
                {errors.name && <FormHelperText id="component-helper-text">{errors.name}</FormHelperText>}
              </div>
              <div className="form-group">
                <TextField error={errors.surname} type="text" name="surname" id="register-surname" label="Apellido" variant="outlined" onChange={this.handleInputChange} />
                {errors.surname && <FormHelperText id="component-helper-text">{errors.surname}</FormHelperText>}
              </div>
              <div className="form-group">
                <TextField error={errors.dni} type="text" pattern="[0-9]+" name="dni" id="register-dni" label="DNI" variant="outlined" onChange={this.handleInputChange} />
                {errors.dni && <FormHelperText id="component-helper-text">{errors.dni}</FormHelperText>}
              </div>
              <div className="form-group">
                <TextField error={errors.email} type="email" name="email" id="register-email" label="Email" variant="outlined" onChange={this.handleInputChange} />
                {errors.email && <FormHelperText id="component-helper-text">{errors.email}</FormHelperText>}
              </div>
              <div className="form-group">
                <TextField error={errors.password} type="password" name="password" id="register-password" label="Contraseña" variant="outlined" onChange={this.handleInputChange} />
                {errors.password && <FormHelperText id="component-helper-text">{errors.password}</FormHelperText>}
              </div>
              <div className="form-group">
                <TextField error={errors.passwordConfirmed} type="password" name="passwordConfirmed" id="register-passwordConfirmed" label="Confirmar contraseña" variant="outlined" onChange={this.handleInputChange}/>
                {errors.passwordConfirmed && <FormHelperText id="component-helper-text">{errors.passwordConfirmed}</FormHelperText>}
              </div>
              <button type="submit" className=" button button-intro">Crear</button>
              </form>
            </div>
          </div>
      </div>
    );
  }
};

export default withSnackbar(Register)