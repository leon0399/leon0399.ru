import type { Meta, StoryObj } from '@storybook/react'

import Tag from './Tag'

export default {
  title: 'Atoms/Tag',
  component: Tag,
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: 'Tag',
  },
}
