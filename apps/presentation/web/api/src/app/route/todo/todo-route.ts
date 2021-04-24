import * as express from 'express'
import { TodoController } from '@presentation-web--api/app/controller/todo'

/**
 * Produce a new express.Router instance describing the API for all
 * Todo items.
 *
 * @returns a new express.Router instance
 *
 * TODO!!!
 */
export function instanciate(): express.Router {
  const router = express.Router()

  router.route('/').get(TodoController.get)

  return router
}
