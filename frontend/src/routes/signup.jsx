import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const Navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [role, setrole] = useState('')
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)

  const handlesignup = async (e) => {
    e.preventDefault()
    setloading(true)
    seterror(null)

    if (!name || !email || !password || !role) {
      seterror('All fields are required')
      setloading(false)
      return
    }
    if (!email.endsWith('@gmail.com')) {
      seterror('Check the email')
      setloading(false)
      return
    }
      if (role === 'admin') {
      seterror('Admin cannot sign up here, Only User can Sign up Here')
      setloading(false)
      return
    }


    try {
      const data = await fetch('https://fitcore-full-stack-gym-project.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      })
      const response = await data.json()
      console.log(response)
      if (!data.ok) {
  seterror(response.message || 'Signup failed');
  return;
}
      alert('A verification code is sent to email ');
      const timestamp = new Date().getTime();
      sessionStorage.setItem("canAccessVerification","true");
      sessionStorage.setItem("verificationStartTime", timestamp.toString());
      Navigate({ to: '/verification' })
    } catch (err) {
      console.error(err)
      seterror('Something went wrong.')
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={handlesignup}>
        <div className="Signups">
          <h1>SignUp</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading && <p>Loading...</p>}

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setrole(e.target.value)}
              placeholder="Enter your role [user, admin]"
            />
          </div>

          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  )
}

