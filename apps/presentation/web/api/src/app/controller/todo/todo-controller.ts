import * as express from 'express'
import * as HTTP from 'http-status-codes'

/**
 * Handles GET requests to the API endpoint for todo items.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 *
 * TODO!!!
 */
export const get: express.RequestHandler = (_, res) => {
  res.status(HTTP.StatusCodes.OK).send({ test: 'SUCCESS' })
}
