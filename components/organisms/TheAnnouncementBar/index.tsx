import { Icon } from '@iconify/react'
import Announcement from '../../atoms/Announcement'

import type { FC } from 'react'

const TheAnnouncementBar: FC = () => (
  <Announcement
    href="/resume.pdf"
    className="text-gray-100 dark:text-gray-900 bg-indigo-600 dark:bg-indigo-300"
  >
    <span className="flex gap-2 items-center px-3">
      I’m looking for new opportunities{' '}
    </span>
    <span className="hidden items-center px-3 space-x-2 lg:flex">
      <span>Download Résumé</span>
      <Icon icon={'heroicons-outline:arrow-down-tray'} className="w-4 h-4" />
    </span>
  </Announcement>
)

export default TheAnnouncementBar
