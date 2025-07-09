import { createFileRoute } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
 
})

function RouteComponent() {
  return <div>
    <div className='about_index'>
      <h1>About GYM</h1>
      <h3 className='underline'>NEW YORK HEALTH & RACQUET CLUB</h3>
    </div>
    <div className='matter'>
      <h4>we believe fitness is more than just a routine — it's a lifestyle. Our facility offers state-of-the-art equipment, dynamic group classes, and personalized coaching to guide every member on their fitness journey. Whether you're a beginner or a seasoned athlete, you'll find a welcoming space here to grow, train, and thrive.</h4>
    </div>
    <div className='orange'>
      <div className='photo'>
      <img src="https://intowellness.in/wp-content/uploads/2024/05/product-detail-banner.webp" alt="" />
      <img src="https://www.fitness-world.in/wp-content/uploads/2022/01/Planning-to-Install-a-Gym-in-your-Society-Banner-1200x620.jpg" alt="" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXE900myl5BCOb5THQO1IFHCHjIyU9ldLoug&s" alt="" />

    </div>

    </div>
    
  </div>
}
