import { Icon } from '@iconify/react'
import { MDXRemote } from 'next-mdx-remote'

import tw, { styled } from 'twin.macro'

import Tag from '../../../atoms/Tag'

import type { TimelineItem as TTimelineItem } from '../../../../types/timeline'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

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
  className?: string
}

const IconWrapper = styled.div<{ color: string }>(({ color }) => [
  tw`p-1.5 rounded-full text-white dark:text-gray-900`,
  color === 'green' && tw`bg-green-600 dark:bg-green-400`,
  color === 'gray' && tw`bg-gray-600 dark:bg-gray-400`,
  color === 'pink' && tw`bg-pink-600 dark:bg-pink-400`,
  color === 'blue' && tw`bg-blue-600 dark:bg-blue-400`,
  color === 'yellow' && tw`bg-yellow-600 dark:bg-yellow-400`,
  color === 'red' && tw`bg-red-600 dark:bg-red-400`,
])

const ItemContainer = styled.article([
  tw`relative flex flex-row gap-3 pb-6 mb-2 last:pb-0 last:mb-0`,
  tw`after:absolute after:block after:top-10 after:bottom-0 after:left-[15px] after:w-[2px] after:bg-gray-200 after:last:bg-transparent`,
  tw`dark:after:bg-gray-700`,
])

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
      className={`
        relative overflow-hidden
        ${isOpen || !shouldCover ? '' : 'h-[80px]'}
      `}
    >
      <div className={`${className} `} ref={contentRef}>
        {children}
      </div>
      {shouldCover && !isOpen && (
        <div
          className={`
              absolute bottom-0
              flex w-full flex-col items-start
              justify-end
              bg-gradient-to-b from-transparent via-white to-white dark:via-gray-900 dark:to-gray-900
            `}
        >
          <button
            className="text-gray-800 dark:text-gray-300"
            onClick={() => setOpen(!isOpen)}
          >
            Read more
          </button>
        </div>
      )}
    </div>
  )
}

// eslint-disable-next-line no-redeclare
const TimelineItem: FC<Props> = ({ item, ...props }) => (
  <ItemContainer {...props}>
    <div className="relative">
      <IconWrapper color={item.color || 'gray'}>
        <Icon icon={item.icon} className="block h-5 w-5" />
      </IconWrapper>
    </div>
    <div className="w-full py-1.5 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex flex-col md:flex-row">
        <h3>
          <MDXRemote
            {...item.title}
            components={{
              p: (({ children }) => <>{children}</>) as FC<PropsWithChildren>,
              a: (({ children, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {children}
                </a>
              )) as FC<PropsWithChildren>,
            }}
          />
        </h3>
        <div className="grow text-xs md:ml-auto md:text-right md:text-sm">
          <span>
            {item.duration.start}
            {item.duration.end && <>&nbsp;&mdash;&nbsp;{item.duration.end}</>}
          </span>
        </div>
      </div>

      {Array.isArray(item.tags) && item.tags.length && (
        <div className="mt-2 flex flex-row space-x-3">
          {item.tags.map((tag, i) => (
            <Tag key={`project-tag-${i}`}>{tag}</Tag>
          ))}
        </div>
      )}

      {item.description && (
        <ReadMore className="prose-sm prose mt-2 dark:prose-invert">
          <MDXRemote
            {...item.description}
            components={{
              a: (({ children, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {children}
                </a>
              )) as FC<PropsWithChildren>,
            }}
          />
        </ReadMore>
      )}
    </div>
  </ItemContainer>
)

export default TimelineItem
