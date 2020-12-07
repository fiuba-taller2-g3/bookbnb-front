import React, { Component } from 'react';
import "./home.scss";
import { SnackbarProvider } from 'notistack';

class Home extends Component {

  constructor(props){
    super(props)
    this.handleCreateAdmin = this.handleCreateAdmin.bind(this)
    this.handleViewUsers = this.handleViewUsers.bind(this)
  }

  handleCreateAdmin(){
    this.props.history.push("/register");
  }

  handleViewUsers(){
    this.props.history.push("/users");
  }
  
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <div className="base-container">
          <div className="header">¡Bienvenido a Bookbnb Admin!</div>
          <div className="admin-options">
            <button name="newAdmin"className="button-home button-home-intro" onClick={this.handleCreateAdmin}>Dar de alta administrador</button>
            <button name="users"className="button-home button-home-intro " onClick={this.handleViewUsers}>Listar usuarios</button>
            <button name="publications" className="button-home button-home-intro" onClick={this.handleViewPublications}>Ver publicaciones</button>
          </div>
        </div>
      </SnackbarProvider>
    );
  }
} export default (Home)