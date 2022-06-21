import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // className?: string
}

const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100
        rounded-2xl
        duration-200 hover:scale-[1.02]
        disabled:cursor-not-allowed
        focus:outline-none focus:ring ring-offset-2
        ${className && className}
      `}
      { ...props }
    >
      { children }
    </button>
  )
}

export default Button
