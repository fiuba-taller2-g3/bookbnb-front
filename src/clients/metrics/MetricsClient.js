const postsMetricsUrl =  `https://facade-server-develop.herokuapp.com/posts/metrics?`
const bookingsMetricsUrl =  `https://facade-server-develop.herokuapp.com/bookings/metrics?`

class MetricsClient {
  constructor() {
    this.getPostsMetrics = this.getPostsMetrics.bind(this);
    this.getBookingsMetrics = this.getBookingsMetrics.bind(this);
  }

  getPostsMetrics = async (fromDate, toDate ) => {
    const url  = postsMetricsUrl + `from_date=${fromDate}&to_date=${toDate}`
    const token = localStorage.getItem("token")
    console.log("token valido")
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };

    const response = await fetch(url, requestConfig);
    return await response.json();
  }

  getBookingsMetrics = async (fromDate, toDate ) => {
    const url  = bookingsMetricsUrl + `from_date=${fromDate}&to_date=${toDate}`
    const token = localStorage.getItem("token")
    console.log("token valido")
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };

    const response = await fetch(url, requestConfig);
    return await response.json();
  }
}

export default MetricsClient = new MetricsClient()