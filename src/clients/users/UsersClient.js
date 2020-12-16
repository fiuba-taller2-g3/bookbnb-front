import usersResponse from './UsersResponse'


const usersUrl =  `https://facade-server-develop.herokuapp.com/users`

class UsersClient {
  constructor() {
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this)
}

  getUsers = async () => { 
    const token = localStorage.getItem("token")
    console.log("token valido")
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };
    const response = await fetch(usersUrl, requestConfig);
    const users = await response.json();
    return usersResponse(users);
  }

  getUserProfile = (userId) => {
    const token = localStorage.getItem("token")
    console.log("getting user_id:", userId)
    const url = usersUrl + `/${userId}`
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };
    return fetch(url, requestConfig).then(response => response.json())
  }

  updateUserStatus = (userId, userStatus) => {
    const id = userId
    const status = userStatus
    const token = localStorage.getItem("token")
    console.log("updating user_id: ", id)
    const url = usersUrl + `/${id}`
    const requestConfig = {
      method: 'PATCH',
      body: JSON.stringify({
        is_blocked: status
      }),
      headers: {
        'Content-Type': 'application/json',
        'API_TOKEN': token
      }
    };
    
    return fetch(url, requestConfig).then(response => response.json())
  }
}

export default UsersClient = new UsersClient()