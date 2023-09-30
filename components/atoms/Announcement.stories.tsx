import type { Meta, StoryObj } from '@storybook/react'

import Announcement from './Announcement'

const meta: Meta<typeof Announcement> = {
  title: 'Atoms/Announcement',
  component: Announcement,
}
export default meta

type Story = StoryObj<typeof Announcement>

export const Default: Story = {
  args: {
    href: '#',
    color: 'indigo',
    children: 'Announcement',
  },
}
