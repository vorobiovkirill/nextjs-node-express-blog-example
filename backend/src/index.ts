import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express, { Request, Response } from 'express'
import Parser from 'rss-parser'
import jwt from 'jsonwebtoken'

const jwtSecret = "mysuperdupersecret";

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

interface ReqQuery {
  page: string;
  sort?: 'asc' | 'desc';
  filter?: string; 
}

const pageSize = 3

app.get('/feed', async (req: Request<{}, {}, {}, ReqQuery>, res: Response) => {
  const { query } = req
  const page = Number(query?.page) || 0
  const sortValue = query?.sort || 'asc'
  const filterValue = query?.filter || ''

  const totalPosts = (await prisma.posts.findMany()).length

  const posts = await prisma.posts.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    ...(filterValue !== '' ? {
      where: {
        title: filterValue
      }
    } : {}),
    orderBy: {
      title: sortValue
    },
    include: {
      author: true
    }
  })
  console.log('posts', posts)
  console.log('totalPosts', totalPosts)
  res.json({ posts, totalPosts })
})

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.posts.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.posts.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true }
  })
  res.json(post)
})

app.put('/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  const post = await prisma.posts.update({
    where: { id: Number(id) },
    data: { title, content },
  })
  res.json(post)
})

app.post(`/login`, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.username,
      password: req.body.password
    },
  })
  const token = jwt.sign({ "name": user?.name }, jwtSecret, { expiresIn: 3600 })

  const userData = {
    ...user,
    accessToken: token 
  }

  res.json(userData)
})

const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001',
  ),
)
