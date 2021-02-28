const transferenceUrl =  `https://facade-server-develop.herokuapp.com/transference`

class TransferenceClient {
  constructor() {
    this.transfer = this.transfer.bind(this);
  }

  transfer = (userId, amount) => { 
    const token = localStorage.getItem("token")
    console.log("token valido")
    const requestConfig = {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        id: userId,
        amount: amount
      }),
      headers: {
        'Content-Type': 'application/json',
        'API_TOKEN': token
      }
    };

    return fetch(transferenceUrl, requestConfig).then(response => response.json())
  }
}

export default TransferenceClient = new TransferenceClient()