import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody'
import tokenChecker from '../../utils/TokenChecker';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/CheckCircle'
import BlockIcon from '@material-ui/icons/Block'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import "./users.scss"

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      usersData:[]
    };

    this.userTransform = this.userTransform.bind(this);
    this.usersTransform = this.usersTransform.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleApiUsersResponse = this.handleApiUsersResponse.bind(this);
    this.handleApiUserUpdateResponse = this.handleApiUserUpdateResponse.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
  }

  usersTransform(response) {
    return response.map(user => this.userTransform(user)).sort((a, b) => a.id - b.id);
  }

  userTransform(user) {
    const state = user.is_blocked ? "bloqueado" : "activo"
    return {
        id: user.id,
        email: user.email,
        type: user.type,
        state: state,
        isBlock: user.is_blocked
    }
  }

  handleApiUsersResponse(response) {
    if (response.error) {
      console.error("There was an error!", response.error)
      this.handleAlertStatus(response.error, 'error' )
      this.props.history.push("/home");
    } 
    else {
      this.setState( {usersData : this.usersTransform(response)} )
    }
  }

  handleApiUserUpdateResponse(response) {
    if (response.error) {
      console.error("There was an error!", response.error)
      this.handleAlertStatus(response.error, 'error' )
      this.props.history.push("/home");
    }
    else {
      this.getUsers()
    } 
  }
    
  getUsers() { 
    if (tokenChecker()) {
      const token = localStorage.getItem("token")
      console.log("token valido")
      const url =`https://facade-server-develop.herokuapp.com/users`
      const requestConfig = {
        mode: 'cors',
        method: 'GET',
        headers: {
          'API_TOKEN': token
        }
      };
      fetch(url, requestConfig).then(response => response.json()).then(this.handleApiUsersResponse);
    }
    else {
      this.props.history.push("/");
    }
  }

  updateUserStatus(userId, userStatus) {
    const id = userId
    const status = userStatus
    if (tokenChecker()) {
      const token = localStorage.getItem("token")
      console.log("updating user_id: ", id)
      const url =`https://facade-server-develop.herokuapp.com/users/${id}`
      const requestConfig = {
        method: 'PATCH',
        body: JSON.stringify({
          is_blocked: status
        }),
        headers: {
          'Content-Type': 'application/json',
          'API_TOKEN': token
        }
      };
      
      fetch(url, requestConfig).then(response => response.json()).then(this.handleApiUserUpdateResponse);
    }
    else {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const users = this.state.usersData
    return (
      <div className="user-list">
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table className="table" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Tipo&nbsp;</StyledTableCell>
                  <StyledTableCell align="center">Estado&nbsp;</StyledTableCell>
                  <StyledTableCell align="center">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">{row.state}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        margin-right="4px"
                        color="primary"
                        className="button"
                        startIcon={<ProfileIcon/>}
                      >
                        Ver perfil
                      </Button>
                    
                      {!row.isBlock && <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="button"
                        startIcon={<BlockIcon />}
                        onClick={() => this.updateUserStatus(row.id, true)}
                      >
                        Bloquear
                      </Button>}

                      {row.isBlock &&
                        <Button
                          variant="contained"
                          size="small"
                          color="default"
                          className="button"
                          startIcon={<CheckIcon />}
                          onClick={() => this.updateUserStatus(row.id, false)}>
                          Desbloquear
                        </Button>}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
  }
} export default (Users)