import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plans')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <div className='plan-container'>
      <div className='plan-card'>
        <h1 className='plan-nav'>Strength training</h1>
        <h3 className='plan-about'>Strength Training helps build lean muscle mass, improve bone density, and boost metabolism through progressive resistance exercises. Whether you're a beginner or advanced lifter, our program is tailored to push your limits and deliver real results.</h3>
        <h5 className='plan-footer'>"Build Power. Gain Confidence."</h5>
      </div>
       <div className='plan-card'>
        <h1 className='plan-nav'>Cardio</h1>
        <h3 className='plan-about'>Cardio training is essential for heart health, fat loss, and increased energy.
                     Our workouts include treadmill runs, cycling, HIIT, and more to keep you moving.
                         Whether you're just starting out or aiming to level up, we've got you covered.</h3>
        <h5 className='plan-footer'>"Get Your Heart Racing"</h5>
      </div>
       <div className='plan-card'>
        <h1 className='plan-nav'>Cross Fit</h1>
        <h3 className='plan-about'>CrossFit blends weightlifting, cardio, and functional movements into one powerful workout.
Designed to improve strength, endurance, and agility across all fitness levels.
Every session is different — keeping your body guessing and your progress steady.</h3>
        <h5 className='plan-footer'>"Train for Life, Not Just the Gym"</h5>
      </div>
    </div>
          <div className='maha'>
        <h1>"You have a right to perform your prescribed duties,
but you are not entitled to the fruits of your actions.
Never consider yourself the cause of the results of your activities,
and never be attached to not doing your duty."</h1>
      </div>
  </div>
}
