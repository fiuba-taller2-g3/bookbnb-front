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

  function createData(id, email, type, status, actions) {
    return { id, email, type, status, actions };
  }

  const rows = [
    createData(1, 'pp.argento@gmail.com', 'anfitrion', 'activo', 'acciones'),
    createData(2, 'coki.argento@gmail.com', 'huesped', 'activo', 'acciones'),
  ];

class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      usersData:[]
    };

    this.userTransform = this.userTransform.bind(this);
    this.usersTransform = this.usersTransform.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  usersTransform(response) {
    return response.map(user => this.userTransform(user));
  }

  userTransform(user) {
    const state = user.is_block ? "bloqueado" : "activo"
    return {
        id: user.id,
        email: user.email,
        type: user.type,
        state: state,
    }
  }

  handleApiResponse(response) {
    if (response.error) {
      console.error("There was an error!", response.error)
      this.handleAlertStatus(response.error, 'error' )
      this.props.history.push("/home");
    } 
    else {
      this.setState( {usersData : this.usersTransform(response)} )
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
      fetch(url, requestConfig).then(response => response.json()).then(this.handleApiResponse);
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
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">{row.state}</StyledTableCell>
                    <StyledTableCell align="center">{row.actions}</StyledTableCell>
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