interface Props {
  className?: string
}

const Tag: React.FC<Props> = ({ children, className }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 ${className}`}>
    { children }
  </span>
)

export default Tag