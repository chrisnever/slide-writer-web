import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/useAuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useLogin()

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  const { dispatch } = useAuthContext()

  return (
    <div>
      <form className='login'>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='E-mail Address'
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='login__btn' onClick={handleSubmit}>
          Login
        </button>

        <div>
          <Link to='/reset'>Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to='/signup'>Register</Link> now.
        </div>
      </form>
    </div>
  )
}

export default Login
