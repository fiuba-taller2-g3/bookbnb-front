import postsResponse from './PostsResponse'

const postsUrl =  `https://facade-server-develop.herokuapp.com/posts`

class PostsClient {
  constructor() {
    this.getPosts = this.getPosts.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePostStatus = this.updatePostStatus.bind(this)
}

  getPosts = async () => { 
    const token = localStorage.getItem("token")
    console.log("token valido")
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };
    const response = await fetch(postsUrl, requestConfig);
    const posts = await response.json();
    return postsResponse(posts);
  }

  getPost = (postId) => {
    const token = localStorage.getItem("token")
    console.log("getting post_id:", postId)
    const url = postsUrl + `/${postId}`
    const requestConfig = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'API_TOKEN': token
      }
    };
    return fetch(url, requestConfig).then(response => response.json())
  }

  updatePostStatus = async (postId, postStatus) => {
    const id = postId
    const status = postStatus
    const token = localStorage.getItem("token")
    console.log("updating post_id: ", id)
    const url = postsUrl + `/${id}`
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
    
    const response = await fetch(url, requestConfig);
      return response;
  }
}

export default PostsClient = new PostsClient()
