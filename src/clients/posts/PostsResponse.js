const postTransform = (post) => {
  const state = post.is_blocked ? "bloqueado" : "activo"
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.date,
    state: state,
    isBlock: post.is_blocked,
    price: post.price,
    type: post.type,
    user: post.user_id
  }
}
  
const postsResponse = (response) => {
  if (response.error) {
    return {
      status: response.error,
      users: null
    }
  }
  return {  
    status: 'ok',
    posts: response.map(post => postTransform(post)).sort((a, b) => b.id - a.id),
  }
}

export default postsResponse