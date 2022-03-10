import { FunctionComponent } from 'react'

import TheFooter from '../components/organisms/TheFooter'
import TheHeader from '../components/organisms/TheHeader'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="">
      <TheHeader />
      <main className='container pt-8 mx-auto'>
        {children}
      </main>
      <TheFooter />
    </div>
  )
}

export default Layout
