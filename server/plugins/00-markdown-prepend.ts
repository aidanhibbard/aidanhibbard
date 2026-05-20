import { defineEventHandler } from 'h3'
import { handleMarkdownRequest } from '../utils/handle-markdown-request'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: '',
    handler: defineEventHandler(handleMarkdownRequest),
  })
})
