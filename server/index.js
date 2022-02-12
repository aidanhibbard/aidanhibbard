const express = require('express')
const compression = require('compression')
const { createPageRenderer } = require('vite-plugin-ssr')
const cors = require('cors')

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  // API Routes
  app.get('/api', cors(), (req, res) => {
    res.json({
      routes_info: [
          {
              get_posts: "/api/posts",
              info: "Fetches posts",
              params: {
                  page: "Integer",
                  limit: "Integer"
              }
          },
          {
              get_post: "/api/posts/:post_name",
              info: "Fetches and creates an article"
          }
      ]
    });
    res.status(200)
  });

  app.get('/api/posts', cors(), async (req, res) => {

  });

  app.get('/api/posts/:post_name', cors(), async (req, res) => {

  });


  app.use(compression())

  // Vite Server
  
  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
