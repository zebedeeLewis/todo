import * as express from 'express'
import * as HTTP from 'http-status-codes'
import * as Result from 'neverthrow'

import type { NextFunction } from 'express'

import * as TodoController from './todo-controller'
import * as Repository from '@libs/infrastructure/repository'
import * as Entity from '@libs/domain/entity'

const VALID_ID_1 = 'dc965fe8-0868-44da-a0df-581010053655'
const VALID_ID_2 = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'

const INVALID_ID_RANDOM = 'randome-id'
const INVALID_ID_V1 = 'e4141c50-aa9e-11eb-9375-9ddbe18c35c9'
const INVALID_ID_V3 = '641eb357-8761-3f64-b791-b2d4398e8532'
const INVALID_ID_V5 = 'f81789d2-8ecc-5d84-b2e8-986e69b7f5d4'

const repoDTO = {}
const todoDTO = <Repository.Todo.Model>{}

jest.mock('@libs/infrastructure/repository', () => {
  return {
    Todo: {
      find: jest.fn(async (id) => {
        return Result.ok({ id })
      }),
      create: jest.fn(() => {
        return todoDTO
      }),
    },
  }
})

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

afterEach(() => {
  jest.clearAllMocks()
})

describe('get_single', () => {
  it(
    'responds with status code "OK" (i.e. calls res.status with ' +
      '200) if a todo item whos "id" matches the id portion of ' +
      'the route has been found.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.status).toHaveBeenLastCalledWith(HTTP.StatusCodes.OK)
      }

      await do_test(VALID_ID_1)
      await do_test(VALID_ID_2)
    }
  )

  it(
    'responds with the DTO for the todo item whos "id" matches ' +
      'the id portion of the route.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request
        const todoDTO = { id }

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.send).toHaveBeenLastCalledWith(todoDTO)
      }

      await do_test(VALID_ID_1)
      await do_test(VALID_ID_2)
    }
  )

  it(
    'responds with status code "BAD_REQUEST" (i.e. calls res.status ' +
      'with 400) if the id portion of the route is not a valid id.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.status).toHaveBeenLastCalledWith(
          HTTP.StatusCodes.BAD_REQUEST
        )
      }

      await do_test(INVALID_ID_RANDOM)
      await do_test(INVALID_ID_V1)
      await do_test(INVALID_ID_V3)
      await do_test(INVALID_ID_V5)
    }
  )

  it(
    'responds with the reason phrase (i.e. calls res.send) for ' +
      'status code "BAD_REQUEST" if the id portion of the route is ' +
      'not a valid id.',
    async () => {
      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.send).toHaveBeenLastCalledWith(
          HTTP.ReasonPhrases.BAD_REQUEST
        )
      }

      await do_test(INVALID_ID_RANDOM)
      await do_test(INVALID_ID_V1)
      await do_test(INVALID_ID_V3)
      await do_test(INVALID_ID_V5)
    }
  )

  it(
    'responds with status code "INTERNAL_SERVER_ERROR" (i.e. calls ' +
      'res.status with 500) if there is an error in the retrieval ' +
      'process.',
    async () => {
      ;(Repository.Todo.find as jest.MockedFunction<
        typeof Repository.Todo.find
      >).mockReturnValue(Promise.resolve(Result.err('random error')))

      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.status).toHaveBeenLastCalledWith(
          HTTP.StatusCodes.INTERNAL_SERVER_ERROR
        )
      }

      await do_test(VALID_ID_1)
      await do_test(VALID_ID_2)
    }
  )

  it(
    'responds with reason phrase (i.e. calls res.send) for status ' +
      'code "INTERNAL_SERVER_ERROR" if there is an error in the ' +
      'retrieval process.',
    async () => {
      ;(Repository.Todo.find as jest.MockedFunction<
        typeof Repository.Todo.find
      >).mockReturnValue(Promise.resolve(Result.err('random error')))

      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.send).toHaveBeenLastCalledWith(
          HTTP.ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      }

      await do_test(VALID_ID_1)
      await do_test(VALID_ID_2)
    }
  )

  it(
    'responds with status code "NOT_FOUND" (i.e. calls res.status ' +
      'with 404) if a todo item with the matching id cannot be found.',
    async () => {
      ;(Repository.Todo.find as jest.MockedFunction<
        typeof Repository.Todo.find
      >).mockReturnValue(Promise.resolve(Result.ok(null)))

      async function do_test(id: string) {
        const req = { params: { id } as any } as express.Request

        await TodoController.get_single(
          repoDTO,
          req,
          res,
          mockedNextFunction
        )

        expect(res.status).toHaveBeenLastCalledWith(
          HTTP.StatusCodes.NOT_FOUND
        )
      }

      await do_test(VALID_ID_1)
      await do_test(VALID_ID_2)
    }
  )
})
