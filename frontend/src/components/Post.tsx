import React from 'react'
import Router from 'next/router'
import type { PostProps } from '../types'

type Props = {
  post: PostProps;
}

const Post: React.FC<Props> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div className="flex justify-center" onClick={() => Router.push('/posts/[id]', `/posts/${post.id}`)}>
      <div className="block p-6 mb-4 rounded-lg shadow-lg bg-white w-full">
        <h2 className="text-gray-900 text-xl leading-tight font-medium mb-2">{post.title}</h2>
        <small>By {authorName}</small>
        <div className="text-gray-700 text-base mb-4">{post.content}</div>
      </div>

    </div>
  )
}

export default Post