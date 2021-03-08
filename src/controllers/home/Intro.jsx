import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import homeImg from "./home.png";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 50,
    height: 50,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper elevation={3}>
        <Grid container direction="row" justify="space-between">
            <Grid item xs={6}>
              <img imageStyle={{width:'50', height: '50'}} src={homeImg}/>
            </Grid>
            <Grid item xs={6} sm container>
              <Box paddingTop={4} paddingLeft={1}>
                <Container maxWidth="sm">
                  <Typography gutterBottom variant="h4">
                    Bienvenido al Backoffice de Bookbnb
                  </Typography>
                  <Typography variant="body1" gutterBottom paragraph align="justify" display="block">
                    Esta herramienta le permitira administrar la app de forma completa, permitiendole agregar nuevos administradores, asi como tambien visualizar usuarios registrados, publicaciones, y tambien le permitira generar metricas de negocio.
                  </Typography>
                </Container>
              </Box>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}