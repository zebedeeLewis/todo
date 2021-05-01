import * as express from 'express'
import * as HTTP from 'http-status-codes'

import type { NextFunction } from 'express'

import * as TodoController from './todo-controller'
import * as Repository from '@libs/infrastructure/repository'

describe('get', () => {
  const mockedSend = jest.fn(function () {
    return this
  }) as jest.MockedFunction<typeof express.response.send>

  const mockedStatus = jest.fn(function (statusCode) {
    return this
  }) as jest.MockedFunction<typeof express.response.status>

  const mockedNextFunction = jest.fn(function (deferToNext: string) {
    return
  }) as jest.MockedFunction<NextFunction>

  const res = ({
    status: mockedStatus,
    send: mockedSend,
  } as unknown) as express.Response

  it(
    'responds with status code "OK" (i.e. calls res.status with ' +
      '200) if a todo item whos "id" matches the id portion of ' +
      'the route has been found.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request
        const repoDTO = {}

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.status).toHaveBeenLastCalledWith(HTTP.StatusCodes.OK)
      }

      await do_test('random-id')
      await do_test('random-id-2')
    }
  )

  it(
    'responds with the DTO for the todo item whos "id" matches ' +
      'the id portion of the route.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request
        const todoDTO = { id }
        const repoDTO = {}

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.send).toHaveBeenLastCalledWith(todoDTO)
      }

      await do_test('random-id')
      await do_test('random-id-2')
    }
  )
})
