import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/adminlogin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState(null)
  const navigate = useNavigate()

  const adminLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    seterror(null)

    try {
      const res = await fetch("https://fitcore-full-stack-gym-project.onrender.com/api/users/adminlogin", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })

      const response = await res.json()
      setIsLoading(false)

      if (!res.ok) {
        seterror(response.message || 'Login failed')
        return
      }
      const date = new Date();
      sessionStorage.setItem("time", date.getTime())
      sessionStorage.setItem("accesstoken", "true")
      navigate({ to: '/workout_details' })
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      seterror('Something went wrong.')
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={adminLogin}>
        <div className="Signups">
          <h1>Admin Login</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isLoading && <p>Loading...</p>}

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

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
