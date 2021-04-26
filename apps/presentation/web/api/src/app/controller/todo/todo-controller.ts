import * as express from 'express'
import * as HTTP from 'http-status-codes'

/**
 * Handles GET requests to the API endpoint for todo items.
 *
 * - it calls "get_single" if the request maps to the /api/v1/todo/:id
 *   route.
 * - it calls "get_collection" if the reqest maps to the /api/v1/todo
 *   route.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 *
 * TODO!!!
 */
export const get: express.RequestHandler = (_, res) => {
  res.status(HTTP.StatusCodes.OK).send({ test: 'SUCCESS' })
}
