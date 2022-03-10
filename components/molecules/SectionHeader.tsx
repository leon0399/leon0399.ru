
import React from 'react';
import { UrlObject } from 'url';

type Url = string | UrlObject;

interface Props {
  title?: string
  href?: Url
  className?: string
}

const SectionHeader: React.FC<Props> = ({ title, children, className }) => (
  <div className={`flex flex-row justify-between items-end my-4 text-gray-900 dark:text-gray-100 ${className}`}>
    { children
      ? children
      : <h2 className="text-xl font-semibold">{ title }</h2>
    }
  </div>
)

export default SectionHeader
