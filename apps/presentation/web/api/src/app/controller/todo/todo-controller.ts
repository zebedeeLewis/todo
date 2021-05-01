import * as express from 'express'
import * as HTTP from 'http-status-codes'
import * as Result from 'neverthrow'

import * as Repository from '@libs/infrastructure/repository'
import * as ValueObject from '@libs/domain/value-object'

const REQ_PARAM_ID = 'id'

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
 *   b. responds with status code "BAD_REQUEST" (i.e. calls res.status
 *      with 400) and the corresponding reason phrase if the id portion
 *      of the route is not a valid id.
 *
 * TODO!!!
 */
export async function get_single(
  todoRepoDTO: Repository.Todo.DTO,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const { [REQ_PARAM_ID]: id } = req.params

  const idValidationResult = ValueObject.Id.validate_DTO(id)
  if (idValidationResult.isErr()) {
    res
      .status(HTTP.StatusCodes.BAD_REQUEST)
      .send(HTTP.ReasonPhrases.BAD_REQUEST)
    return
  }

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
