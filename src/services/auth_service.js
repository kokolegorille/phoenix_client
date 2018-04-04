// It is not possible to decode Phoenix.Token on the client side!
// https://elixirforum.com/t/how-to-decode-phoenix-token-client-side/9680

class AuthService {
  loadToken = () => localStorage.getItem('react@phoenixAuthToken')
  saveToken = token => localStorage.setItem('react@phoenixAuthToken', token)
  removeToken = () => localStorage.removeItem('react@phoenixAuthToken')
  refreshToken = () => this.saveToken(this.loadToken())
  isLoggedIn = () => !!this.loadToken()
}

export default new AuthService();
