import React from 'react';
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
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountIcon from "@material-ui/icons/AccountCircle";
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import FilterIcon from '@material-ui/icons/Filter';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Users from '../users-v2/Users'
import Register from '../register/Register'
import Posts from '../posts/Posts'
import Metrics from '../metrics/Metrics'
import createHistory from 'history/createBrowserHistory'
import Intro from "./Intro";

export const history = createHistory()

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

function HomeV2(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState("Bienvenido a Bookbnb admin")

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSetTitle = (title) => {
    setTitle(title);
  };

  const handleLogout = () => {
    localStorage.clear()
    history.push("/");
    window.location.reload()
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key="home" component={Link} to="/home" onClick={() => handleSetTitle("Backoffice Bookbnb")}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button key="register" component={Link} to="/register" onClick={() => handleSetTitle("Registrar nuevo administrador")}>
            <ListItemIcon><AccountIcon /></ListItemIcon>
            <ListItemText primary="Registrar Administrador" />
          </ListItem>
          <ListItem button key="users" component={Link} to="/users" onClick={() => handleSetTitle("Usuarios")}>
            <ListItemIcon><GroupSharpIcon /></ListItemIcon>
            <ListItemText primary="Ver usuarios" />
          </ListItem>
          <ListItem button key="posts" component={Link} to="/posts" onClick={() => handleSetTitle("Publicaciones")}>
            <ListItemIcon><FilterIcon /></ListItemIcon>
            <ListItemText primary="Ver publicaciones" />
          </ListItem>
          <ListItem button key="metrics" component={Link} to="/metrics" onClick={() => handleSetTitle("Metricas de negocio")}>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText primary="Metricas" />
          </ListItem>
        </List>
        <Divider />
        <ListItem button key="logout" component={Link} to="/" onClick={() => handleLogout()}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
    </div>
  );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}>
             <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
                {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="padding-app-bar"></div>
        <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <SnackbarProvider maxSnack={3}>
              <Route exact path="/home" render={() => <Intro/>} />
              <Route path="/register" render={() => <Register/>} />
              <Route path="/users" render={() => <Users/>} />
              <Route path="/posts" render={() => <Posts/>} />
              <Route path="/metrics" render={() => <Metrics/>} />
            </SnackbarProvider>
          </Switch>
        </main>
      </BrowserRouter>
      </div>
      );
} export default (HomeV2)
