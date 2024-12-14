const LoginForm = ({ onLogin, username, password, onUsernameChange, onPasswordChange }) => {
  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={onLogin}>
        <div>
                    username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={onUsernameChange}
          />
        </div>
        <div>
                    password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={onPasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm