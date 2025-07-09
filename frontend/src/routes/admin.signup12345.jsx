import { createFileRoute,  } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/signup12345')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isloading, setisloading] = useState(false)
  const [error, seterror] = useState(null)
  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setisloading(true)
    seterror(null)

    try {
      const data = await fetch("http://localhost:5000/api/users/admin", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      const response = await data.json()
      setisloading(false)
      console.log(response)

      if (!data.ok) {
        seterror(response.message || 'Signup failed')
        return
      }

      alert("Admin is Created")
      navigate({ to: "/adminlogin" })

    } catch (err) {
      console.log(err)
      setisloading(false)
      seterror('Something went wrong.')
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={signup}>
        <div className="Signups">
          <h1>SignUp</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isloading && <p>Loading...</p>}

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

          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  )
}
