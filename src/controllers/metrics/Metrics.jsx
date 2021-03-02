import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { isAfter } from 'date-fns'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText'
import { isEqual } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [metricsType, setMetricsType] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [finalDate, setFinalDate] = React.useState(new Date());
  const [errorDate, setErrorDate] = React.useState(false)
  const [errorMetric, setErrorMetric] = React.useState(false)
  const [errorMsgStart] = React.useState('*La fecha de inicio no puede ser mayor a la de fin')
  const [errorMsgFinal] = React.useState('*La fecha de fin no puede ser menor a la de inicio')

  const handleChange = (event) => {
    setMetricsType(event.target.value)
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleFinalDateChange = (date) => {
    setFinalDate(date);
  };

  const validateMetricSelecction = () => {
    return metricsType.length === 0
  }

  const submit = () => {
    if( validateMetricSelecction()){
      setErrorMetric(true)
    } else setErrorMetric(false)

    if (isEqual(startDate, finalDate) || isAfter(finalDate, startDate)) {
          setErrorDate(false)
    } else setErrorDate(true)
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="space-between" alignItems="flex-start">
        <Grid item xs={12} container direction="row">
          <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-metric-native-simple">Seleccione una métrica</InputLabel>
              <Select
                native
                value={metricsType}
                onChange={handleChange}
                label="Seleccione una metrica"
              >
                <option aria-label="None" value="" />
                <option value={'posts'}>Publicaciones creadas por día</option>
                <option value={'reservations'}>Reservas hechas por día</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha de inicio"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              {errorDate && <FormHelperText id="component-helper-text"><Box color="error.main">{errorMsgStart}</Box></FormHelperText>}
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fecha de fin"
                value={finalDate}
                onChange={handleFinalDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              {errorDate && <FormHelperText id="component-helper-text"><Box color="error.main">{errorMsgFinal}</Box></FormHelperText>}
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Box paddingTop={4} paddingLeft={1}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" disableElevation onClick={submit}>
              Buscar
            </Button>
            {errorMetric && <FormHelperText id="component-helper-text"><Box color="error.main">{"*Debe seleccionar una metrica"}</Box></FormHelperText>}
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
