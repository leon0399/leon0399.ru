import Link from 'next/link'
import React, {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react'
import tw, { css, theme } from 'twin.macro'

export type Color = 'default' | 'primary'
export type Variant = 'solid' | 'outline' | 'ghost'

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'ref'>
type LinkProps = Omit<ComponentProps<typeof Link>, 'ref'>
type BaseProps = ButtonProps | LinkProps

export type Props = BaseProps & {
  /**
   * @default 'default'
   */
  color?: Color

  /**
   * @default 'solid'
   */
  variant?: Variant
}

const isLink = (props: BaseProps): props is LinkProps => {
  return 'href' in props
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ color = 'default', variant = 'solid', ...props }, ref) => {
    const styles = [
      css`
        --color: ${theme('colors.gray.200')};
        --color-hover: ${theme('colors.gray.300')};
        --color-disabled: ${theme('colors.gray.100')};
      `,
      tw`
        rounded-2xl px-4 py-2 ring-offset-2 bg-[--color]
        duration-200
        hover:(bg-[--color-hover])
        focus:(outline-none ring)
        disabled:(cursor-not-allowed bg-[--color-disabled])
      `,
    ]

    return isLink(props) ? (
      <Link
        {...(props as LinkProps)}
        css={styles}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      />
    ) : (
      <button
        {...(props as ButtonProps)}
        css={styles}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      />
    )
  },
)

Button.displayName = 'Button'

export default Button
