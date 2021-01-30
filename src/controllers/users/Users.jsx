import React, { Component } from 'react';
import UsersClient from '../../clients/users/UsersClient'
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
import sleep from '../../utils/Sleep';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/CheckCircle'
import BlockIcon from '@material-ui/icons/Block'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import UserProfile from './UserProfile'
import { withSnackbar } from 'notistack';
import createHistory from 'history/createBrowserHistory'
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

export const history = createHistory()

class Users extends Component {

  constructor(props){
    super(props)
    this.state = {
      usersData: [],
      showProfile: false,
      userProfileData: {}
    };
    
    this.handleUsersResponse = this.handleUsersResponse.bind(this);
    this.handleUserUpdateResponse = this.handleUserUpdateResponse.bind(this);
    this.handleUserProfileResponse = this.handleUserProfileResponse.bind(this);
    this.handleOnClickViewProfile = this.handleOnClickViewProfile.bind(this);
    this.handleShowProfile = this.handleShowProfile.bind(this)
    this.handleAlertStatus = this.handleAlertStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleError = this.handleError.bind(this)
  }

  handleAlertStatus = (message, status) => {
    this.props.enqueueSnackbar(message, {variant: status})
  }

  handleUsersResponse(response) {
    console.log(response)
    if (response.status !== "ok") {
      this.handleError(response.error)
    } 
    else {
      this.setState( { usersData : response.users } )
    }
  }

  handleUserProfileResponse(response) {
    if (response.error) {
      this.handleError(response.error)
    } 
    else {
      this.setState( {userProfileData : response} )
    }
  }

  handleUserUpdateResponse(response) {
    if (response.error) {
      this.handleError(response.error)
    }
    else {
      this.getUsers()
    } 
  }
    
  getUsers() { 
    if (tokenChecker()) {
      UsersClient.getUsers().then(this.handleUsersResponse)
    } 
    else { this.handleLogout() }
  }

  getUserProfile(userId) {
    if (tokenChecker()) {
      UsersClient.getUserProfile(userId).then(this.handleUserProfileResponse);
    }
    else { this.handleLogout() }
  }

  updateUserStatus(userId, userStatus) {
    if (tokenChecker()) {
      UsersClient.updateUserStatus(userId, userStatus).then(this.handleUserUpdateResponse);
    }
    else { this.handleLogout() }
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    this.getUsers();
  }

  handleError = (error) =>  {
    console.error("There was an error!", error)
    this.handleAlertStatus(error, 'error' )
    history.push("/home");
  }

  handleShowProfile(event) {
    this.setState({showProfile: event});
  }

  handleOnClickViewProfile(id){
    console.log('ver perfil')
    this.setState({showProfile: true});
    this.getUserProfile(id)
  }

  handleLogout(){
    history.push("/")
    this.handleAlertStatus('Caduco la sesión, inicie sesión nuevamente', 'info' )
    sleep(1500).then(() => {
      window.location.reload();
    })
  }

  render() {
    const showProfile = this.state.showProfile
    const users = this.state.usersData
    const userProfileData = this.state.userProfileData
    return (
      <div>
        <div className="user-list">
          <Container maxWidth="lg">
            <TableContainer component={Paper}>
              <Table className="table" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Estado&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">{row.email}</StyledTableCell>
                      <StyledTableCell align="center">{row.state}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          margin-right="4px"
                          color="primary"
                          className="button"
                          startIcon={<ProfileIcon/>}
                          onClick={() => this.handleOnClickViewProfile(row.id)}
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
        {showProfile && <UserProfile user={userProfileData} showProfile={this.handleShowProfile}/>}
      </div>
    );
  }
} export default withSnackbar(Users)