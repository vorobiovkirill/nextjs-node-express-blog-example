import React, { useState } from 'react'
import Layout from '../src/components/Layout'
import Router from 'next/router'

const CreatPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, authorEmail }
      await fetch(`http://localhost:3001/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/posts')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <h1>Create Post</h1>
        <form
          onSubmit={submitData}>
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
              id="author"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={e => setAuthorEmail(e.target.value)}
              placeholder="Author (email address)"
              type="text"
              value={authorEmail}
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
            <button
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              disabled={!content || !title || !authorEmail}
              type="submit"
            >Add
            </button>
            <a className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => Router.push('/posts')}>
              Back
            </a>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default CreatPost
