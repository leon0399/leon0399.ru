import { FunctionComponent } from 'react'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout