import { FunctionComponent } from 'react'

import TheFooter from '../components/organisms/TheFooter'
import TheHeader from '../components/organisms/TheHeader'

// Content
import { primarySocials } from '../content/socials'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="">
      <TheHeader />
      <main className="pt-8 mx-auto">{children}</main>
      <TheFooter socials={primarySocials} />
    </div>
  )
}

export default Layout
