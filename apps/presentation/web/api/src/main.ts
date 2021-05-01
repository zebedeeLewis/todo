import * as express from 'express'
import * as TodoRouter from '@presentation-web--api/app/route/todo'
import * as Repository from '@libs/infrastructure/repository'

import type { Server } from 'http'

const API_PATH_ROOT = '/api/v1'
const TODO_API_PATH_ROOT = API_PATH_ROOT + '/todo'
const DEFAULT_PORT = 3333

/**
 * Start the server
 *
 * @returns the listening express server.
 */
function start(): Server {
  const app = express()

  const todoRepo = Repository.Todo.create({})
  app.use(TODO_API_PATH_ROOT, TodoRouter.instanciate(todoRepo))

  const port = process.env.port || DEFAULT_PORT
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`)
  })

  server.on('error', console.error)

  return server
}

start()
