
const userTransform = (user) => {
  const state = user.is_blocked ? "bloqueado" : "activo"
  return {
    id: user.id,
    email: user.email,
    state: state,
    isBlock: user.is_blocked,
    walletId: user.wallet_id
  }
}

const usersResponse = (response) => {
  if (response.error) {
    return {
      status: response.error,
      users: null
    }
  }
  return {  
    status: 'ok',
    users: response.map(user => userTransform(user)).sort((a, b) => a.id - b.id),
  }
}

export default usersResponse