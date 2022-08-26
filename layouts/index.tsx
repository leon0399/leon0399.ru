import { FunctionComponent } from 'react'

import TheAnnouncementBar from '../components/organisms/TheAnnouncementBar'
import TheHeader from '../components/organisms/TheHeader'
import TheFooter from '../components/organisms/TheFooter'

// Content
import { primarySocials } from '../content/socials'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <TheAnnouncementBar />
      <TheHeader />
      <main className="pt-8 mx-auto">{children}</main>
      <TheFooter socials={primarySocials} />
    </>
  )
}

export default Layout
