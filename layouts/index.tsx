import { FunctionComponent } from 'react'
import TheHeader from '../components/organisms/TheHeader'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="">
      <TheHeader />
      <main className='container mx-auto'>
        {children}
      </main>
    </div>
  )
}

export default Layout