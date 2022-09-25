import {
  FC,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react'

type BaseProps =
  | DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  | DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >

type Props = BaseProps

const isButton = (
  props: BaseProps,
): props is DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> => {
  return !('href' in props)
}

const Button: FC<Props> = ({ children, className, ...props }) => {
  if (isButton(props)) {
    return (
      <button
        className={`
          rounded-2xl bg-gray-200 px-4 py-2 ring-offset-2
          duration-200
          hover:scale-[1.02] hover:bg-gray-300
          focus:outline-none
          focus:ring disabled:cursor-not-allowed disabled:bg-gray-100
          dark:bg-gray-800 dark:hover:bg-gray-700
          ${className && className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <a
        className={`
          rounded-2xl bg-gray-200 px-4
          py-2
          ring-offset-2 duration-200
          hover:scale-[1.02]
          hover:bg-gray-300 focus:outline-none focus:ring
          disabled:cursor-not-allowed disabled:bg-gray-100
          ${className && className}
        `}
        {...props}
      >
        {children}
      </a>
    </>
  )
}

export default Button
