import { Icon } from "@iconify/react"
import { MDXRemote } from 'next-mdx-remote'

import tw, { styled } from 'twin.macro'

import Tag from "../../../atoms/Tag"

import type { TimelineItem as TTimelineItem } from "../../../../types/timeline"
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from "react"

// eslint-disable-next-line no-undef
export type TimelineItem = Modify<TTimelineItem, {
  title: MDXRemoteSerializeResult
  description?: MDXRemoteSerializeResult
}>

interface Props {
  item: TimelineItem
  className?: string
}

const IconWrapper = styled.div<{ color: string }>(({ color }) => [
  tw`p-1.5 rounded-full text-white dark:text-gray-900`,
  color === 'green' && tw`bg-green-600 dark:bg-green-400`,
  color === 'gray' && tw`bg-gray-600 dark:bg-gray-400`,
  color === 'pink' && tw`bg-pink-600 dark:bg-pink-400`,
])

const ItemContainer = styled.article([
  tw`relative flex flex-row gap-3 pb-6 mb-2 last:pb-0 last:mb-0`,
  tw`after:absolute after:block after:top-10 after:bottom-0 after:left-[15px] after:w-[2px] after:bg-gray-200 after:last:bg-transparent`,
  tw`dark:after:bg-gray-700`
])

// eslint-disable-next-line no-redeclare
const TimelineItem: React.FC<Props> = ({ item, ...props }) => (
  <ItemContainer {...props} >
    <div className="relative">
      <IconWrapper color={item.color || 'gray'}>
        <Icon icon={item.icon} className="block w-5 h-5" />
      </IconWrapper>
    </div>
    <div className="py-1.5 w-full text-sm text-gray-600 dark:text-gray-300">
      <div className="flex flex-col md:flex-row">
        <h3>
          <MDXRemote {...item.title} components={({
            'p': (({ children }) => <>{ children }</>) as React.FC
          })} />
        </h3>
        <div className="grow text-xs md:ml-auto md:text-sm md:text-right">
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
        <div className="flex flex-row mt-2 space-x-3">
          { item.tags.map((tag, i) => (
            <Tag key={`project-tag-${i}`}>{ tag }</Tag>
          )) }
        </div>
      ) }
    </div>
  </ItemContainer>
)

export default TimelineItem
