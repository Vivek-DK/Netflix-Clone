import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import { userData } from '../../context/UserContext'
const Login = () => {

  const { setUser } = userData();

  const [signState , setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signState === 'Sign In') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    setUser({name, email});
  }
  return (
    <div className='login'> 
      <img src={logo} alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState=== "Sign Up"?<input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />:<></>}
          <input type="email" placeholder='Email or phone number' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='btn' onClick={handleSubmit} type='submit' style={{ backgroundColor:'red', color:'white' }}>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="from-switch">
          {signState==="Sign In"?<p>New to Netflix? <span onClick={()=>setSignState('Sign Up')}>Sign Up</span></p>:<></>}

          {signState==="Sign Up"?<p>Already have an account? <span onClick={()=>setSignState('Sign In')}>Sign In</span></p>:<></>}
        </div>
      </div>
    </div>
  )
}

export default Login
