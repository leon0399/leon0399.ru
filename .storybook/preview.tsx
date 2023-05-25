import { Preview } from '@storybook/react'
import GlobalStyles from './../components/GlobalStyles'
import { theme } from 'twin.macro'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    layout: 'centered',
    backgrounds: {
      default: 'primary-white',
      values: [
        {
          name: 'primary-white',
          value: `linear-gradient(180deg, ${theme`colors.primary`}, ${theme`colors.white`})`,
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
}

export default preview
