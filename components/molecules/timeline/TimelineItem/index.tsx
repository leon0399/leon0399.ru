import { Icon } from '@iconify/react'
import * as mdx from '@mdx-js/react/lib'
import clsx from 'clsx'
import {
  MDXRemote,
  type MDXRemoteProps,
  MDXRemoteSerializeResult,
} from 'next-mdx-remote'
import React, {
  type FC,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import tw, { styled } from 'twin.macro'

import type { TimelineItem as TTimelineItem } from '../../../../types/timeline'
import Tag from '../../../atoms/Tag'

// eslint-disable-next-line no-undef
export type TimelineItem = Modify<
  TTimelineItem,
  {
    title: MDXRemoteSerializeResult
    description?: MDXRemoteSerializeResult
  }
>

interface Props {
  item: TimelineItem
}

const ReadMore: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState<number>()

  useEffect(() => setHeight(contentRef.current?.clientHeight), [contentRef])

  const [isOpen, setOpen] = useState<boolean>()
  const shouldCover = useMemo<boolean>(() => !!height && height > 100, [height])

  return (
    <div
      ref={containerRef}
      tw="relative overflow-hidden"
      css={[shouldCover && !isOpen && tw`h-[80px]`]}
    >
      <div className={clsx(className)} ref={contentRef}>
        {children}
      </div>
      {shouldCover && !isOpen && (
        <div
          tw="
            absolute bottom-0
            flex w-full flex-col items-start
            justify-end
            bg-gradient-to-b from-transparent via-white to-white dark:via-gray-900 dark:to-gray-900
          "
        >
          <button
            tw="text-gray-800 dark:text-gray-300"
            onClick={() => setOpen(!isOpen)}
          >
            Read more
          </button>
        </div>
      )}
    </div>
  )
}

const IconWrapper = styled.div<{ $color: string }>(({ $color }) => [
  tw`p-1.5 rounded-full text-white dark:text-gray-900`,
  $color === 'green' && tw`bg-green-600 dark:bg-green-400`,
  $color === 'gray' && tw`bg-gray-600 dark:bg-gray-400`,
  $color === 'pink' && tw`bg-pink-600 dark:bg-pink-400`,
  $color === 'blue' && tw`bg-blue-600 dark:bg-blue-400`,
  $color === 'yellow' && tw`bg-yellow-600 dark:bg-yellow-400`,
  $color === 'red' && tw`bg-red-600 dark:bg-red-400`,
])

type Anchor = NonNullable<mdx.Components['a']>
type Paragraph = NonNullable<mdx.Components['p']>

const MDXParagraphComponent: Paragraph = ({ children }) => <>{children}</>
const MDXAnchorComponent: Anchor = ({ children, ...props }) => (
  <a
    {...props}
    target="_blank"
    rel="noopener noreferrer"
    tw="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
  >
    {children}
  </a>
)

// eslint-disable-next-line no-redeclare
const TimelineItem: FC<Props> = ({ item, ...props }) => (
  <article
    tw="
      relative mb-2 flex flex-row gap-3 pb-6 after:absolute after:bottom-0
      after:left-[15px] after:top-10 after:block after:w-[2px] after:bg-gray-200 last:mb-0 last:pb-0 after:last:bg-transparent
      dark:after:bg-gray-700
    "
    {...props}
  >
    <div tw="relative">
      <IconWrapper $color={item.color || 'gray'}>
        <Icon icon={item.icon} tw="block size-5" />
      </IconWrapper>
    </div>
    <div tw="w-full py-1.5 text-sm text-gray-600 dark:text-gray-300">
      <div tw="flex flex-col md:flex-row">
        <h3>
          <MDXRemote
            {...item.title}
            components={{
              p: MDXParagraphComponent,
              a: MDXAnchorComponent,
            }}
          />
        </h3>
        <div tw="grow text-xs md:ml-auto md:text-right md:text-sm">
          <span>
            {item.duration.start}
            {item.duration.end && <>&nbsp;&mdash;&nbsp;{item.duration.end}</>}
          </span>
        </div>
      </div>

      {Array.isArray(item.tags) && item.tags.length && (
        <div tw="mt-2 flex flex-row space-x-3">
          {item.tags.map((tag, i) => (
            <Tag key={`project-tag-${i}`}>{tag}</Tag>
          ))}
        </div>
      )}

      {item.description && (
        <ReadMore className="prose prose-sm mt-2 dark:prose-invert">
          <MDXRemote
            {...item.description}
            components={{
              a: MDXAnchorComponent,
            }}
          />
        </ReadMore>
      )}
    </div>
  </article>
)

export default TimelineItem
