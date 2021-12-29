import { FunctionComponent } from 'react'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <div className="min-h-screen">
        <main className='container mx-auto'>{children}</main>
      </div>
    </>
  )
}

export default Layout