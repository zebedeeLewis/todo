import * as express from 'express'
import * as HTTP from 'http-status-codes'
import * as Result from 'neverthrow'

import * as Repository from '@libs/infrastructure/repository'

/**
 * Handles GET requests to the API endpoint for a single todo items.
 * It loads the requested item from from the repository and returns
 * a response object with the item if it is found and the appropriate
 * HTTP status code.
 *
 * @param todoRepo - the database repository for todo items.
 * @param req - the express Request object.
 * @param res - the express Response object.
 *
 * @remarks it:
 *   a. responds with status code "OK" (i.e. calls res.status with
 *      200) and the DTO for the todo item whos "id" matches the id
 *      portion of the route.
 *
 * TODO!!!
 */
export async function get_single(
  todoRepoDTO: Repository.Todo.DTO,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const { id } = req.params

  const repoCreateResult = Repository.Todo.create(todoRepoDTO)
  if (repoCreateResult.isErr()) {
    return next()
  }

  repoCreateResult.map(async (todoRepo) => {
    const queryResult = await Repository.Todo.find(id, todoRepo)

    queryResult.map((todoDto) =>
      res.status(HTTP.StatusCodes.OK).send(todoDto)
    )
  })

  return
}
