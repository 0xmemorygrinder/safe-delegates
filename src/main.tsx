import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen' // auto-generated

const hashStore = createHashHistory()

const router = createRouter({ routeTree, history: hashStore })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
