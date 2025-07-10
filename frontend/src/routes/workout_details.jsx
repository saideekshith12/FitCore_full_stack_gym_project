import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/workout_details')({
    beforeLoad:()=>{
        const accesstoken = sessionStorage.getItem("accesstoken")
        const time = sessionStorage.getItem("time")
        if(!accesstoken || !time){
            return redirect({to:'/adminlogin'})
        }
        const now = new Date().getTime()
        const savedTime = Number(time)
        const expirytime = 10 * 60*1000
        if(now - savedTime > expirytime){
            sessionStorage.removeItem('accesstoken');
            sessionStorage.removeItem('time');
            throw redirect({ to: '/adminlogin' });
        }
    },
  component: RouteComponent,
})

function RouteComponent() {
    const [Day,setDay]= useState("")
    const [age, setage] =useState("")
    const [workout,setworkout] =useState("")
    const [workout1, setworkout1]=useState("")
    const [workout2, setworkout2]=useState("")
    const [workout3, setworkout3]=useState("")
    const [workout4, setworkout4]=useState("")
    const [isLoading, setisloading]=useState(false)
    const [error, seterror] = useState("")

    const handleworkout = async (e)=>{
        e.preventDefault();
        setisloading(true)
        seterror(null)
        if (
    !Day.trim() ||
    !age.trim() ||
    !workout.trim() ||
    !workout1.trim() ||
    !workout2.trim() ||
    !workout3.trim() ||
    !workout4.trim()
  ) {
    setisloading(false);
    seterror("All fields are required.");
    return;
  }
        try {
          const data = await fetch ("https://fitcore-full-stack-gym-project.onrender.com/api/users/Workout_details",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                Day,
                age,
                Workout_details: workout,   // ✅ This maps correctly
                Workout1: workout1,
                Workout2: workout2,
                Workout3: workout3,
                Workout4: workout4
            })
        })
        const response = await data.json();
        console.log(response)
       if (!data.ok) {
  throw new Error(response.message || "Submission failed");
}
        alert("Entry was Successful")
        
        setDay("");
    setage("");
    setworkout("");
    setworkout1("");
    setworkout2("");
    setworkout3("");
    setworkout4("");
    setisloading(false);
      
    } catch (error) {
        console.log(error)
        setisloading(false)
        seterror('Something went wrong.')
    }
    }

  return (
    <div className="signup-container1">
      <form onSubmit={handleworkout}>
        <div className="Signups">
          <h1>Workout Details</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isLoading && <p>Loading...</p>}

          <div>
            <label htmlFor="Day">Day</label>
            <input
              type="text"
              value={Day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Enter Day [ Monday to Saturday]"
            />
          </div>

          <div>
            <label htmlFor="Age">Age</label>
            <input
              type="Number"
              value={age}
              onChange={(e) => setage(e.target.value)}
              placeholder="Enter Age [20 and 30 ]"
            />
          </div>
                    <div>
            <label htmlFor="Workout">Workout</label>
            <input
              type="text"
              value={workout}
              onChange={(e) => setworkout(e.target.value)}
              placeholder="Chest or biceps or so on"
            />
          </div>
                    <div>
            <label htmlFor="workout1">Workout1</label>
            <input
              type="text"
              value={workout1}
              onChange={(e) => setworkout1(e.target.value)}
              placeholder="Excersie 1"
            />
          </div>
          <div>
            <label htmlFor="workout2">Workout2</label>
            <input
              type="text"
              value={workout2}
              onChange={(e) => setworkout2(e.target.value)}
              placeholder="Excersie 2"
            />
          </div>
          <div>
            <label htmlFor="workout3">Workout3</label>
            <input
              type="text"
              value={workout3}
              onChange={(e) => setworkout3(e.target.value)}
              placeholder="Excersis 3"
            />
          </div>
          <div>
            <label htmlFor="workout4">Workout4</label>
            <input
              type="text"
              value={workout4}
              onChange={(e) => setworkout4(e.target.value)}
              placeholder="Excerise 4"
            />
          </div>
                
          

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
