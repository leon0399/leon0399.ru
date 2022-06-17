import { FC } from "react";
import { Post } from "../../../../types/hashnode";
import PostItem from "../../../molecules/blog/PostItem";
import SectionHeader from "../../../molecules/SectionHeader";

interface Props {
  id?: string
  className?: string
  posts: Post[]
}

const HomeBlog: FC<Props> = ({ id, className, posts }) => {
  return (
    <section id={id} className={`w-full ${className}`}>
      <SectionHeader title="Blog" href="https://blog.leon0399.ru" />

      <div>
        { posts.map((post, i) => {
          return (
            <PostItem
              id={`home-post-${post._id}`}
              key={`home-post-${i}`}
              post={post}
            />
          )
        })}
      </div>
    </section>
  )
}

export default HomeBlog
