/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { AppProps } from 'next/app'

import MyApp from './_app'

// Mock router object with required properties
const router = {
  basePath: '',
  pathname: '/',
  query: {},
  asPath: '/',
}

describe('MyApp', () => {
  it('should render a component with page props', () => {
    const props: AppProps = {
      Component: ({ title }) => (
        <>
          <div>Test Component</div>
          <div>{title}</div>
        </>
      ),
      pageProps: { title: 'Test Page' },
      router: router as never, // Include mocked router object in props
    }

    render(<MyApp {...props} />)

    expect(screen.getByText('Test Component')).toBeInTheDocument()
    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })
})
