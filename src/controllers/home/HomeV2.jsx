import React, { Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import MailIcon from '@material-ui/icons/Mail';
import Users from '../users/Users'
import Register from '../register/Register'
import "./home.scss";

const drawerWidth = 240;

const theme = useTheme

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

class HomeV2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

   drawer = (
    <div>
      <div className={useStyles.toolbar} />
        <Divider />
        <List>
          <ListItem button key="Alta-admin" component={Link} to="/register">
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Registrar Administrador" />
          </ListItem>
          <ListItem button key="usuarios" component={Link} to="/users">
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="Ver usuarios" />
          </ListItem>
        </List>
        <Divider />
    </div>
  );

  render() {
    return (
      <div className={useStyles.root}>
        <CssBaseline />
        <AppBar position="fixed" className={useStyles.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => this.handleDrawerToggle()}
              className={useStyles.menuButton}>
             <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="padding-app-bar"></div>
        <BrowserRouter>
        <nav className={useStyles.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={() => this.handleDrawerToggle()}
              classes={{
                paper: useStyles.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {this.drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: useStyles.drawerPaper
              }}
              variant="permanent"
              open
            >
              {this.drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={useStyles.content}>
          <div className={useStyles.toolbar} />
          <Switch>
            <SnackbarProvider maxSnack={3}>
              <Route exact path="/home" render={() => <div>Home Page</div>} />
              <Route path="/register" render={() => <Register/>} />
              <Route path="/users" render={() => <Users/>} />
            </SnackbarProvider>
          </Switch>
        </main>
      </BrowserRouter>
      </div>
      );
    }
} export default (HomeV2)
