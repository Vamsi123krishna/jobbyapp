import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(Userdetails),
    }
    const response = await fetch(url, options)
    const data = response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangingUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangingPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          value={username}
          id="username"
          placeholder="Username"
          onChange={this.onChangingUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangingPassword}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          {showErrorMsg && <p>*{errorMsg}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
