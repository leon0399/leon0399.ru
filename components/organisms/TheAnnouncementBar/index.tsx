import { Icon } from '@iconify/react'
import Announcement from '../../atoms/Announcement'

import type { FC } from 'react'

const TheAnnouncementBar: FC = () => (
  <Announcement
    href="/resume.pdf"
    className="bg-indigo-600 text-gray-100 dark:bg-indigo-300 dark:text-gray-900"
  >
    <span className="flex items-center gap-2 px-3">
      Hey, I’m looking for new opportunities!{' '}
    </span>
    <span className="hidden items-center space-x-2 px-3 lg:flex">
      <span>Download Résumé</span>
      <Icon icon={'heroicons-outline:arrow-down-tray'} className="h-4 w-4" />
    </span>
  </Announcement>
)

export default TheAnnouncementBar
