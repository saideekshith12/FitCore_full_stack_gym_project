import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <div className='price'>
      <h1>PRICING ARE COMING SOON .....</h1>

    </div>
  </div>
}
