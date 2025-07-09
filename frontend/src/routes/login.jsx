import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const[email, setemail]= useState('')
  const [password, setpassword]= useState('')
  const [err,seterr]= useState(null)
  const[loading, setloading] =useState(false)
  const navigate = useNavigate()

  const handlelogin= async (e)=>{
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:5000/api/users/login",{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Accept':"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          email,
          password
        })
      })
      const response = await data.json()
      setloading(false)
      console.log(response)
      if(!data.ok){
        seterr(response.message || 'login failed')
        return;
      }
      sessionStorage.setItem('emailtoken', response.token)
      navigate({to :'/userage'})
    } catch (err) {
      console.log(err)
      seterr("Something went wrong , Check once again")
    }
  }
  return <div>
    <div className='login-container'>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {loading && <p>loading...</p>}
      <form onSubmit={handlelogin}>
        <div className='login-inside'>
              <label htmlFor="email" className='login-label'>Email</label>
              <input className='login-input' type="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              placeholder='Enter your email' />

        </div>
        <div className='login-inside'>
          <label htmlFor="password" className='login-label'>Password</label>
          <input className='login-input' type="text"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          placeholder ='Enter your email' />
        </div>
        <div>
          <button className='login-button' type='submit'>Login</button>
          </div>       
      </form>
    </div>
  </div>
}
