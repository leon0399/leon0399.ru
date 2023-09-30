import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: action('clicked'),
    color: 'default',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    href: '#',
  },
}
