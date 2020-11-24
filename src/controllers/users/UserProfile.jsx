import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default class UserProfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      userData:{},
      open: false
    };
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.showProfile(false)
  };

  render () {
    const user = this.props.user;
    const open = user ? true : false
    const birthDate = Moment(user.birth_date, 'YYYY-MM-DD HH:mm Z').format('DD/MM/YYYY');
    
    return (
      <div>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Perfil de usuario
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Nombre: {user.name} 
            </Typography>
            <Typography gutterBottom>
              Apellido: {user.surname}
            </Typography>
            <Typography gutterBottom>
              Sexo: {user.gender}
            </Typography>
            <Typography gutterBottom>
              Fecha de nacimiento: {birthDate}
            </Typography>
            <Typography gutterBottom>
              Telefono: {user.phone_number}
            </Typography>
            <Typography gutterBottom>
              Tipo de usuario: {user.type}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
