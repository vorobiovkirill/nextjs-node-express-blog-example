import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../src/components/Layout'
import Router from 'next/router'
import type { PostProps } from '../../src/types'

async function editPost({ postId, title, content }: { postId: number, title: string, content: string }): Promise<void> {
  await fetch(`http://localhost:3001/edit/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      content
    })
  })
  await Router.push('/posts')
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3001/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/posts')
}

const Post: React.FC<PostProps> = props => {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)

  const handleEditPost = () => {
    editPost({ postId: props.id, title, content })
  }

  const handleDeletePost = () => deletePost(props.id)

  return (
    <Layout>
      <div>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </div>
        <div className="mb-6">
            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              disabled
              id="author"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Author (email address)"
              type="text"
              value={props?.author?.name}
            />
          </div>
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
          <textarea
            cols={50}
            id="content"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
        </div>
        <div className="mb-6 flex justify-start gap-x-3">
          <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleEditPost}>
            Save
          </button>
          <button className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleDeletePost}>
            Delete
          </button>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/post/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}

export default Post
