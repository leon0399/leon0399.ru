interface Props {
  className?: string
}

const Tag: React.FC<Props> = ({ children, className }) => (
  <span className={`
    inline-flex 
    items-center 
    px-2 py-0.5 
    rounded 
    text-xs 
    text-gray-700 dark:text-gray-200
    bg-gray-100 dark:bg-gray-800
    ${className}`}>
    { children }
  </span>
)

export default Tag