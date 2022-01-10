import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { createHashHistory } from 'history';


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignup()

  let history = createHashHistory();

  const handleSubmit = e => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <div >
      <form className='login'>
        <label>
          <span>profile</span>
          <input
            type='text'
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder='Display Name'
          />
        </label>
        <input
          type='email'
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
        <button onClick={handleSubmit}>signup</button>
        <div>
          Already Have an Account? <Link to='/login'>Login</Link> here.
        </div>
      </form>
    </div>
  )
}

export default SignUp
