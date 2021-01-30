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

export default class PostView extends Component{
  constructor(props){
    super(props)
    this.state = {
      postData:{},
      open: false
    };
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.showPost(false)
  };

  render () {
    const post = this.props.post;
    const open = post ? true : false
    const state = post.is_blocked ? "bloqueado" : "activo"
    
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
              <Typography variant="h6" className={useStyles.title}>Publicación</Typography>
            </Toolbar>
          </AppBar>
          <div className="user-profile-title"></div>
          <List>
            <ListItem button>
              <ListItemText primary="Tipo de alojamiento" secondary={post.type} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Fecha de creación" secondary={post.date}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Titulo" secondary={post.title}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Descripcion" secondary={post.description}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Estado" secondary={state}/>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Precio" secondary={post.price}/>
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    );
  }
}
