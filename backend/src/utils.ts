import { PrismaClient } from '@prisma/client'
import Parser from 'rss-parser'

const parser = new Parser()
const prisma = new PrismaClient()

export const parseRSS = async () => {
    const feed = await parser.parseURL('https://lifehacker.com/rss')

    await Promise.all(feed.items.map(async (item) => {
        await prisma.posts.create({
            data: {
                title: item.title || '',
                content: item.content,
                author: { connect: { email: item.creator } },
            },
        })
    }));

}