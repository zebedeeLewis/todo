import * as express from 'express'
import * as _ from 'underscore'

import * as TodoController from '@presentation-web--api/app/controller/todo'
import * as Repository from '@libs/infrastructure/repository'

/**
 * Produce a new express.Router instance describing the API for all
 * Todo items.
 *
 * @returns a new express.Router instance
 *
 * TODO!!!
 */
export function instanciate(
  todoRepo: Repository.Todo.Model
): express.Router {
  const router = express.Router()

  router
    .route('/:id')
    .get(_.partial(TodoController.get_single, todoRepo))

  return router
}
