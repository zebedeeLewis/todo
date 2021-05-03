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
 * @param todoRepoDTO - the database repository for todo items.
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
 *   c. responds with status code "INTERNAL_SERVER_ERROR" (i.e. calls
 *      res.status with 400) and the corresponding reason phrase if
 *      there is an error in the retrieval process.
 *
 * Assumptions:
 *   a. We assume that the given todoRepoDto has been validated.
 *
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

  const todoRepo = Repository.Todo.create(todoRepoDTO)
  const queryResult = await Repository.Todo.find(id, todoRepo)
  if (queryResult.isErr()) {
    res
      .status(HTTP.StatusCodes.INTERNAL_SERVER_ERROR)
      .send(HTTP.ReasonPhrases.INTERNAL_SERVER_ERROR)
    return
  }

  queryResult.map((todoDto) =>
    res.status(HTTP.StatusCodes.OK).send(todoDto)
  )

  return
}
