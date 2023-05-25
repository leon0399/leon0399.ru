import React, { type FC } from 'react'
import { Icon } from '@iconify/react'

import Announcement from '../../atoms/Announcement'

import 'twin.macro'

const TheAnnouncementBar: FC = () => (
  <Announcement href="/resume.pdf" color={'indigo'}>
    <span tw="flex items-center gap-2 px-3">
      Hey, I’m looking for new opportunities!{' '}
    </span>
    <span tw="hidden items-center space-x-2 px-3 lg:flex">
      <span>Download Résumé</span>
      <Icon icon={'heroicons-outline:arrow-down-tray'} tw="h-4 w-4" />
    </span>
  </Announcement>
)

export default TheAnnouncementBar
