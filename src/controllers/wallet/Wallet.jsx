import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TransferenceClient  from '../../clients/transference/TransferenceClient';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useSnackbar } from 'notistack';

export default function FormDialog(props) {
  const [amount, setAmount] = useState([])
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleClose = () => {
    props.showWallet(false)
  };

  const handleInputChange =(event) => {
    const input = event.target;
    setAmount(input.value);
  };

  const validateValue = () => {
      var amountFormat = /^[0-9]+(\.[0-9]+)*$/;
      if(amountFormat.test(amount)) {
        setError(false)
        return true;
      }
      setErrorMsg('*Ingrese un monto valido')
      setError(true)
      return false
  };

  const handleAlertStatus = (message, status) => {
    enqueueSnackbar(message, {variant: status})
  };

  const handleApiResponse = (response) => {
    console.log("respuesta de transference", response)
    if (response.transaction) {
      handleAlertStatus('Transacción exitosa', 'success' )
    } 
    else {
      handleAlertStatus('Ocurrio un error', 'error' )
    }
  }

  const handleLoadMoney = () => {
    console.log("se carga el walletId:", props.id)
    if (validateValue()) {
      TransferenceClient.transfer(props.id, amount).then(handleApiResponse);
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick="true">
        <DialogTitle id="form-dialog-title">Cargar saldo</DialogTitle>
        <DialogContent>
          <TextField autoFocus error={error} margin="dense" id="wallet" label="Ingrese monto" type="text" pattern="[0-9]+" fullWidth onChange={handleInputChange}/>
            {error && <FormHelperText id="component-helper-text">{errorMsg}</FormHelperText>}
        </DialogContent>
        <DialogActions> 
          <Button onClick={handleLoadMoney} color="primary">
            Aceptar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}