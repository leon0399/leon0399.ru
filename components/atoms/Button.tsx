import React, { type FC, type ComponentProps } from 'react'
import Link from 'next/link'

import tw from 'twin.macro'

type BaseProps = JSX.IntrinsicElements['button'] | ComponentProps<typeof Link>

type Props = BaseProps

const isButton = (
  props: BaseProps,
): props is JSX.IntrinsicElements['button'] => {
  return !('href' in props)
}

const buttonStyles = tw`
  rounded-2xl bg-gray-200 px-4 py-2 ring-offset-2
  duration-200
  hover:scale-[1.02] hover:bg-gray-300
  focus:outline-none focus:ring
  disabled:cursor-not-allowed disabled:bg-gray-100
`

const Button: FC<Props> = ({ children, ...props }) => {
  if (isButton(props)) {
    return (
      <button css={[buttonStyles]} {...props}>
        {children}
      </button>
    )
  }

  return (
    <>
      <Link css={[buttonStyles]} {...(props as ComponentProps<typeof Link>)}>
        {children}
      </Link>
    </>
  )
}

export default Button
