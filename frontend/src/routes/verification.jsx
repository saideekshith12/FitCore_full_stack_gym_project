import { createFileRoute,  } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/verification')({
  beforeLoad: () => {

    if (typeof window !== 'undefined') {
    const startTime = sessionStorage.getItem('verificationStartTime');
      const canAccess = sessionStorage.getItem('canAccessVerification')
      if (canAccess !== 'true' || !startTime) {
        throw redirect({ to: '/login' })
      }
       const currentTime = new Date().getTime();
       const elapsed = currentTime - parseInt(startTime); // ms
       const fiveMinutes = 1 * 60 * 1000;
       if (elapsed > fiveMinutes) {
      // Expired
      sessionStorage.removeItem('canAccessVerification');
      sessionStorage.removeItem('verificationStartTime');
      throw redirect({ to: '/signup' });
    }
    } else {
      // On SSR or if window is not available
      throw redirect({ to: '/signup' })
    }
    

  },
  component: RouteComponent,
})

function RouteComponent() {

  const [otp , setotp] =useState("")
  const [loading, setloading] =useState(false)
  const [error, seterror]=useState(null)
    const navigate = useNavigate()

  const handleotp = async(e)=>{
    e.preventDefault();

    if(!otp){
      alert("Invalid otp")
      return;
    }
       setloading(true);
    seterror(null);
    
    try {
      const data = await fetch("https://fitcore-full-stack-gym-project.onrender.com/api/users/verify",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
         credentials: 'include', 
        body:JSON.stringify({
          token : otp.trim()
        })
      })
      const response = await data.json()
      if (!data.ok) {
  seterror(response.message || 'Invalid OTP')
  return
}
 sessionStorage.removeItem("canAccessVerification");
      sessionStorage.removeItem("verificationStartTime");
    alert("verified successfully")
      navigate({to :'/login'})
    } catch (error) {
      seterror(error.message)
    }
  }
  return <div>
    <form onSubmit={handleotp}>
      <div className='otp'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>loading...</p>}
        <h1>OTP</h1>
        <input type="text"
        value={otp}
        onChange={(e)=>setotp(e.target.value)}
        placeholder='Enter your otp' />
        
      </div>
      <div>
        <button type="submit" className='otp1'>Submit</button>
      </div>
    </form>
    
  </div>
}
