import { FC, useMemo } from "react";
import { Post } from "../../../types/hashnode";
import tw, { styled } from 'twin.macro'
import Image from "next/image";

interface Props {
  id?: string
  className?: string
  post: Post
}

const PostContainer = styled.article([
  tw`relative flex flex-row py-4 px-6 gap-4 border rounded-lg shadow-lg`,
  tw`transition-colors duration-300`,
  tw`bg-white dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus-within:ring ring-offset-2`,
])

const PostItem: FC<Props> = ({ post, ...props }) => {
  const datePosted = useMemo(
    () => new Date(post.dateAdded),
    [post]
  )

  return (
    <PostContainer {...props} >
      <div className="flex-1">
        <h3 className="mb-1 text-lg font-bold tracking-tight">{ post.title }</h3>
        <div className="my-1 text-xs">
          <time
            className="text-gray-400 dark:text-gray-600"
            dateTime={post.dateAdded}
          >
            { datePosted.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }
          </time>
        </div>
        <p className="my-1 text-sm leading-5 text-gray-600 dark:text-gray-400">
          { post.brief }
        </p>
      </div>
      { post.coverImage && (
        <figure className="w-56">
          <Image
            className="rounded"
            src={post.coverImage}
            width={224}
            height={126}
            alt={post.title}
          />
          <figcaption className="hidden">{post.title}</figcaption>
        </figure>
      ) }
      <a
        className="absolute inset-0 w-full h-full focus:outline-none"
        href={`https://blog.leon0399.ru/${post.slug}`}
        target="_blank"
        rel="noreferrer"
      >

      </a>
    </PostContainer>
  )
}

export default PostItem
