import { createFileRoute } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <div className='image-container'>
      <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?cs=srgb&dl=pexels-anush-1229356.jpg&fm=jpg" alt="" />
      <div className='text'>
        <h3>THE BEST FITNESS
          <br />
          STUDIO IN TOWN
          <br />
          <span className='spa'>Explore Now</span>
        </h3>
        <h5>MOST POPULAR FEATURES ..</h5>       
     </div>
     <div className="card-container">
  <div className="card">
    <div className="side">.</div>
    <div className="header">PROGRESSION</div>
    <div className="footer">Stay consistent, and results will follow  </div>
  </div>
  <div className="card">
    <div className="side">.</div>
    <div className="header">WORKOUT</div>
    <div className="footer">Crush your body</div>
  </div>
  <div className="card">
    <div className="side">.</div>
    <div className="header">NUTRITION</div>
    <div className="footer">Eat clean, feel strong, and recover better.</div>
  </div>
  <div className="card">
    <div className="side">.</div>
    <div className="header">SELF DEFENCE</div>
    <div className="footer">Learn to fight with this world</div>
  </div>
</div> 
    </div>
    <div className="mobile-view">
        <p style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>
          Mobile page is coming soon. Please open on a PC or laptop.
        </p>
      </div>
    </div>
}
