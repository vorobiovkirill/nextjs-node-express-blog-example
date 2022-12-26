import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../src/components/Layout'
import Post from '../src/components/Post'
import { Filters } from '../src/components/Filters'
import Pagination from '../components/Pagination'
import type { PostProps } from '../src/types'
import { pageCount } from '../src/utils/pageCount'

type Props = {
  totalPosts: PostProps[]
  totalPostCount: number
}

const Blog: React.FC<Props> = props => {
  const posts = props.totalPosts
  const totalPostCount = props.totalPostCount

  return (
    <Layout>
      <div className="page">
        <Filters />
        <main>
          {posts.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
          <Pagination totalPostCount={totalPostCount} />
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, sort = 'asc', filterByTitle = '' } = context.query
  const resp = await fetch(`http://localhost:3001/feed?page=${page}&filter=${filterByTitle}&sort=${sort}`)
  const data = await resp.json()

  let totalPostCount = pageCount(data.totalPosts)
  let totalPosts = data.posts.slice(0, 3)
  
  return {
    props: { totalPosts, totalPostCount },
  }
}

export default Blog