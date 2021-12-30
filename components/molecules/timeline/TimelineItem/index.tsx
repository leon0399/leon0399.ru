import { Icon } from "@iconify/react"
import { MDXRemote } from 'next-mdx-remote'

import Tag from "../../../atoms/Tag"

import type { TimelineItem as TTimelineItem } from "../../../../types/timeline"
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type TimelineItem = Modify<TTimelineItem, {
  title: MDXRemoteSerializeResult
  description?: MDXRemoteSerializeResult
}>

interface Props {
  item: TimelineItem
  className?: string
}

const TimelineItem: React.FC<Props> = ({ item, className }) => (
  <article className={`relative flex flex-row gap-3 pb-6 mb-2 last:pb-0 last:mb-0 ${className} after:absolute after:block after:top-10 after:bottom-0 after:left-[15px] after:w-[2px] after:bg-gray-200 after:last:bg-transparent`}>
    <div className="relative">
      <div className={`p-2 text-white rounded-full bg-gray-600 bg-${item.color}-600`}>
        <Icon icon={item.icon} className="block h-4 w-4" />
      </div>
    </div>
    <div className="w-full text-sm text-gray-600 py-1.5">
      <div className="flex flex-col md:flex-row">
        <h3>
          <MDXRemote {...item.title} components={({
            'p': (({ children }) => <>{ children }</>) as React.FC
          })} />
        </h3>
        <div className="flex-grow text-xs md:ml-auto md:text-sm md:text-right">
          <span>
            { item.duration.start }
            { item.duration.end && (
              <>&nbsp;&mdash;&nbsp;{ item.duration.end }</>
            )}
          </span>
        </div>
      </div>

      { item.description && (
        <p className="mt-2">
          <MDXRemote {...item.description} components={({
            'p': (({ children }) => <>{ children }</>) as React.FC
          })} />
        </p>
      ) }

      { Array.isArray(item.tags) && item.tags.length && (
        <div className="flex flex-row space-x-3 mt-2">
          { item.tags.map((tag, i) => (
            <Tag key={`project-tag-${i}`}>{ tag }</Tag>
          )) }
        </div>
      ) }
    </div>
  </article>
)

export default TimelineItem
