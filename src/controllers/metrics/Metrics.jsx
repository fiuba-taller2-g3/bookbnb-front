import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText'
import MetricsClient  from '../../clients/metrics/MetricsClient';
import Moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { BarChart, Bar, Cell, Legend, ResponsiveContainer } from 'recharts';

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
  const [metricsData, setMetricsData] = React.useState([]);
  const [fromDate, setFromDate] = React.useState(Moment());
  const [toDate, setToDate] = React.useState(Moment());
  const [errorDate, setErrorDate] = React.useState(false)
  const [errorMetric, setErrorMetric] = React.useState(false)
  const [errorMsgStart] = React.useState('*La fecha de inicio no puede ser mayor a la de fin')
  const [errorMsgFinal] = React.useState('*La fecha de fin no puede ser menor a la de inicio')
  const [showMetrics, setShowMetrics] = React.useState({
    posts:false,
    bookings:false
  })

  const handleChange = (event) => {
    setMetricsType(event.target.value)
  };

  const handleStartDateChange = (date) => {
    setFromDate(Moment(date));
  };

  const handleFinalDateChange = (date) => {
    setToDate(Moment(date));
  };

  const validateMetricSelecction = () => {
    return metricsType.length > 0
  }

  const validateInputs = () => {
    const metricValidator =  validateMetricSelecction()
    const dateValidator = toDate.isSameOrAfter(fromDate)
    setErrorMetric(!metricValidator)
    setErrorDate(!dateValidator)

    return metricValidator && dateValidator

  }

  const handlePostsMetricResponse = (response) => {
    console.log('data metrics:',response)
    setMetricsData(response)
    setShowMetrics({
      posts:true,
      bookings: false
    }) 
  }

  const handleBookingsMetricResponse = (response) => {
    console.log('data metrics:',response)
    setMetricsData(response)
    setShowMetrics({
      posts:false,
      bookings: true
    }) 
  }

  const submit = () => {
   if (validateInputs()) {
     switch(metricsType) {
       case 'posts': return MetricsClient.getPostsMetrics(fromDate.format('YYYY-MM-DD').toString(), toDate.format('YYYY-MM-DD').toString()).then(handlePostsMetricResponse);
       case 'bookings': return MetricsClient.getBookingsMetrics(fromDate.format('YYYY-MM-DD').toString(), toDate.format('YYYY-MM-DD').toString()).then(handleBookingsMetricResponse);
      }
   }
  }

  const renderLineChart = (
    <LineChart width={900} height={600} data={metricsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  const renderBarChart = (color) => (
    <BarChart width={900} height={600} data={metricsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" barSize={20} fill={color}/>
    </BarChart>
  );
  

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
                <option value={'bookings'}>Reservas hechas por día</option>
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
                value={fromDate}
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
                value={toDate}
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
      <Box paddingTop={6}>
        <Grid item xs={12}>
          {showMetrics.posts && renderBarChart("#8884d8")}
          {showMetrics.bookings && renderBarChart("#43c745")}
        </Grid>
      </Box>
    </div>
  );
}
