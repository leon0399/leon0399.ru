
import { UrlObject } from 'url';

type Url = string | UrlObject;

interface Props {
  title?: string
  href?: Url
}

const SectionHeader: React.FC<Props> = ({ title, href, children }) => (
  <div className="flex flex-row items-end justify-between my-4 text-gray-900 dark:text-gray-100">
    { children
      ? children
      : <h2 className="text-xl font-semibold">{ title }</h2>
    }
  </div>
)

export default SectionHeader