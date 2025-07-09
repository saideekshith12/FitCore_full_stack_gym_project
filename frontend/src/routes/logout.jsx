
import { createFileRoute, redirect } from '@tanstack/react-router'

// This will run before the route renders
export const Route = createFileRoute('/logout')({
  beforeLoad: () => {
    // Clear session storage (or localStorage if you're using that)
    sessionStorage.removeItem('emailtoken')

    // Redirect to login
    return redirect({ to: '/login' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  // This won't be visible because the redirect happens before render
  return <div>Logging out...</div>
}