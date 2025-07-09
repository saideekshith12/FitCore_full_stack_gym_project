import * as React from 'react'
import { Outlet, createRootRoute,Link } from '@tanstack/react-router'
import '../App.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <React.Fragment>
        <div className='container'>
            <div className='Start'>
                <h1>FiT CORE</h1>
            </div>

            <div className='middle'>
                <Link to='/' className='nav' activeProps={{className:'active'}}><h3>Home</h3></Link>
                <Link to='about' className='nav'  activeProps={{className:'active'}}  preload="intent"><h3>About us</h3></Link>
                <Link to='/pricing' className='nav'  activeProps={{className:'active'}}><h3>Pricing</h3></Link>
                <Link to='/plans' className='nav'  activeProps={{className:'active'}}><h3>Plans</h3></Link>
                <Link to='/contact' className='nav'  activeProps={{className:'active'}}><h3>Contact</h3></Link>
            </div>

            <div className='end'>
                <Link to='/signup' ><button type='submit' className='signup'>Signup</button></Link>
                <Link to='/login' ><button type='submit' className='login'>Login</button></Link>
                <Link to='/logout' ><button type='submit' className='login'>Logout</button></Link>

            </div>

        </div>
      <Outlet />
    </React.Fragment>
  )
}
