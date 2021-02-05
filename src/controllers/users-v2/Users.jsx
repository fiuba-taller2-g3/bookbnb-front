import React, { useEffect, useState } from 'react';
import UsersClient from '../../clients/users/UsersClient'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Actions from './ActionsButton'
import { useSnackbar } from 'notistack';
import sleep from '../../utils/Sleep';
import tokenChecker from '../../utils/TokenChecker';
import createHistory from 'history/createBrowserHistory';
import UserView from './UserView';
import WalletView from '../wallet/Wallet';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '200ch',
  },
  inline: {
    display: 'inline',
  },
}));

export const history = createHistory()

export default function AlignItemsList(){
  const [usersData, setUsersData] = useState([])
  const [user, setUser] = useState({})
  const [userId, setUserId] = useState({})
  const [showUser, setShowUser] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [updateUser, setUpdateUser] = useState(false)
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlertStatus = (message, status) => {
    enqueueSnackbar(message, {variant: status})
  }
  
  const handleLogout = () => {
    history.push("/")
    handleAlertStatus('Caduco la sesión, inicie sesión nuevamente', 'info' )
    sleep(1500).then(() => {
      window.location.reload();
    })
  }
  
  const handleError = (error) =>  {
    console.error("There was an error!", error)
    handleAlertStatus(error, 'error' )
    history.push("/home");
  }
  
  const handleUsersResponse = (response) => {
    console.log(response)
    if (response.status !== "ok") {
      handleError(response.error)
    } 
    else {
      console.log('UsersData:', response.users)
      setUsersData(response.users) 
    }
  }

  const handleUserResponse = (response) => {
    if (response.error) {
      handleError(response.error)
    } 
    else {
      console.log('UserData:', response)
      setUser(response)
    }
  }

  const handleUserUpdateResponse = (response) => {
    console.log(response.status)
    if (response.error) {
      handleError("error")
    }
    else {
      getUsers()
      setUpdateUser(true)
    } 
  }
  
  const getUsers = () => {
    if (tokenChecker()) {
      UsersClient.getUsers().then(handleUsersResponse)
    } 
    else { handleLogout() }
  }

  const getUser = (id) => {
    if (tokenChecker()) {
      console.log('user_id:', id)
      UsersClient.getUserProfile(id).then(handleUserResponse)
    } 
    else { handleLogout() }
  }

  const handleBlock = (id, newState) => {
    if (tokenChecker()) {
      UsersClient.updateUserStatus(id, newState).then(handleUserUpdateResponse);
    }
    else { handleLogout() }
  }

  const handleOpenUserView = (id, newState) => {
    setShowUser(newState)
    getUser(id)
  }

  const handleOpenWalletView = (id, newState) => {
    setShowWallet(newState)
    setUserId(id)
    console.log("walletState:",newState)
    console.log("userId wallet:", id)
}

  const handleCloseUserView = (event) => {
    setShowUser(event)
  }

  const handleCloseWalletView = (event) => {
    setShowWallet(event)
  }

  useEffect(() => {
      getUsers()
  },[setUpdateUser]);

  return (
    <List className={classes.root}>
      {(usersData != null && usersData.length > 0) ?
      usersData.map(row => (
        <div key={row.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={row.email}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color={(row.isBlock) ? "secondary" : "primary"}
                  >
                    {'Estado: '} {row.state}
                  </Typography>
                </React.Fragment>
              }
            />
            <Actions showView={handleOpenUserView} showWallet={handleOpenWalletView} userId={row.id} block={handleBlock} isBlock={row.isBlock}/>
          </ListItem>
          <div>
            <Divider variant="inset" component="li" /> 
          </div>
        </div>
      )):""}
       {showUser && <UserView user={user} showUser={handleCloseUserView}/>}
       {showWallet && <WalletView id={userId} open={true} showWallet={handleCloseWalletView}/>}
    </List>
  );
}
