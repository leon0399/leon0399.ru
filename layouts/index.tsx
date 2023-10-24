import { type FC, type PropsWithChildren } from 'react'

import TheAnnouncementBar from '../components/organisms/TheAnnouncementBar'
import TheFooter from '../components/organisms/TheFooter'
import TheHeader from '../components/organisms/TheHeader'
// Content
import { primarySocials } from '../content/socials'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TheAnnouncementBar />
      <TheHeader />
      <main className="mx-auto pt-8">{children}</main>
      <TheFooter socials={primarySocials} />
    </>
  )
}

export default Layout
