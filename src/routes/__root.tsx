import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Providers } from '../components/providers'
import { Layout } from '../layout'

export const Route = createRootRoute({
  component: () => (
    <>
      <Providers>
        <Layout>
          <Outlet />
        </Layout>
      </Providers>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})