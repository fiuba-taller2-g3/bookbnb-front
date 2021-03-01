import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
    
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class UserView extends Component{
  constructor(props){
    super(props)
    this.state = {
      userData:{},
      open: false
    };
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.showUser(false)
  };

  render () {
    const user = this.props.user;
    const open = user ? true : false
    const birthDate = Moment(user.birth_date, 'YYYY-MM-DD HH:mm Z').format('DD/MM/YYYY');
    const state = user.is_blocked ? "bloqueado" : "activo"
    
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={useStyles.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={useStyles.title}>Perfil de usuario</Typography>
            </Toolbar>
          </AppBar>
          <div className="user-profile-title"></div>
          <List>
            <ListItem button>
              <ListItemText primary="Nombre" secondary={user.name} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Apellido" secondary={user.surname}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Email" secondary={user.email}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Fecha de nacimiento" secondary={birthDate}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Sexo" secondary={user.gender}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Teléfono" secondary={user.phone_number}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Estado" secondary={state}/>
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    );
  }
}
