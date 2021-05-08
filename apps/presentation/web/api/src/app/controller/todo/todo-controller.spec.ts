import * as express from 'express'
import * as HTTP from 'http-status-codes'
import * as Result from 'neverthrow'

import type { NextFunction } from 'express'

import * as TodoController from './todo-controller'
import * as Repository from '@libs/infrastructure/repository'
import * as Entity from '@libs/domain/entity'

jest.mock('@libs/infrastructure/repository', () => {
  const { Todo } = jest.requireActual('@libs/infrastructure/repository')
  return {
    Todo: {
      find: jest.fn(),
      create: Todo.create,
    },
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Todo Controller', () => {
  describe('get_single', () => {
    it(
      'responds with status code "OK" if a todo item exists with ' +
        'the requested id',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) =>
          Result.ok({} as Entity.Todo.DTO)
        )

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [[HTTP.StatusCodes.OK], [HTTP.StatusCodes.OK]]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.status.mock.calls[0],
          res.status.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with the DTO of the todo item with the ' +
        'requested id',
      async () => {
        // Arrange
        const todoDTO = {
          title: 'test title',
          details: 'random details',
          creationTime: '2021-05-07T06:00:00.000Z',
          completionTime: null,
        }

        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) =>
          Result.ok({ ...todoDTO, id })
        )

        const res = ({
          status: jest.fn(function (s) {
            return this
          }) as jest.MockedFunction<typeof express.response.status>,
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [
          [{ ...todoDTO, id: idA }],
          [{ ...todoDTO, id: idB }],
        ]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.send.mock.calls[0],
          res.send.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with status code "Bad Request" if the id ' +
        'provided by the caller is invalid.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) =>
          Result.ok({} as Entity.Todo.DTO)
        )

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const randomId = 'randome-id'
        const uuidV1 = 'e4141c50-aa9e-11eb-9375-9ddbe18c35c9'
        const uuidV3 = '641eb357-8761-3f64-b791-b2d4398e8532'
        const uuidV5 = 'f81789d2-8ecc-5d84-b2e8-986e69b7f5d4'

        const expected = [
          [HTTP.StatusCodes.BAD_REQUEST],
          [HTTP.StatusCodes.BAD_REQUEST],
          [HTTP.StatusCodes.BAD_REQUEST],
          [HTTP.StatusCodes.BAD_REQUEST],
        ]

        // Act
        await get_single({ params: { id: uuidV1 } as any })
        await get_single({ params: { id: uuidV3 } as any })
        await get_single({ params: { id: uuidV5 } as any })
        await get_single({ params: { id: randomId } as any })
        const recieved = [
          res.status.mock.calls[0],
          res.status.mock.calls[1],
          res.status.mock.calls[2],
          res.status.mock.calls[3],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with the reason phrase for the "Bad Request" ' +
        'if the id provided by the caller is invalid.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) =>
          Result.ok({} as Entity.Todo.DTO)
        )

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const randomId = 'randome-id'
        const uuidV1 = 'e4141c50-aa9e-11eb-9375-9ddbe18c35c9'
        const uuidV3 = '641eb357-8761-3f64-b791-b2d4398e8532'
        const uuidV5 = 'f81789d2-8ecc-5d84-b2e8-986e69b7f5d4'

        const expected = [
          [HTTP.ReasonPhrases.BAD_REQUEST],
          [HTTP.ReasonPhrases.BAD_REQUEST],
          [HTTP.ReasonPhrases.BAD_REQUEST],
          [HTTP.ReasonPhrases.BAD_REQUEST],
        ]

        // Act
        await get_single({ params: { id: uuidV1 } as any })
        await get_single({ params: { id: uuidV3 } as any })
        await get_single({ params: { id: uuidV5 } as any })
        await get_single({ params: { id: randomId } as any })
        const recieved = [
          res.send.mock.calls[0],
          res.send.mock.calls[1],
          res.send.mock.calls[2],
          res.send.mock.calls[3],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with status code "Internal Server Error" if there ' +
        'was an error in the retrieval process.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) => Result.err('random error'))

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [
          [HTTP.StatusCodes.INTERNAL_SERVER_ERROR],
          [HTTP.StatusCodes.INTERNAL_SERVER_ERROR],
        ]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.status.mock.calls[0],
          res.status.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with the reason phrase for the "Internal Server ' +
        'Error" if the id provided by the caller is invalid.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) => Result.err('random error'))

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [
          [HTTP.ReasonPhrases.INTERNAL_SERVER_ERROR],
          [HTTP.ReasonPhrases.INTERNAL_SERVER_ERROR],
        ]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.send.mock.calls[0],
          res.send.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with status code "Not Found" if no todo item ' +
        'with the requested id can be found.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) => Result.ok(null))

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [
          [HTTP.StatusCodes.NOT_FOUND],
          [HTTP.StatusCodes.NOT_FOUND],
        ]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.status.mock.calls[0],
          res.status.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'responds with the reason phrase for the "Not Found" ' +
        'status code if no todo item with requeste id can be found.',
      async () => {
        // Arrange
        ;(Repository.Todo.find as jest.MockedFunction<
          typeof Repository.Todo.find
        >).mockImplementation(async (id) => Result.ok(null))

        const res = ({
          status: jest.fn(function (s) {
            return this
          }),
          send: jest.fn(function (s) {
            return this
          }),
        } as unknown) as express.Response

        const get_single = async (req) => {
          await TodoController.get_single(
            {},
            req,
            res,
            jest.fn() as jest.MockedFunction<NextFunction>
          )
        }

        const idA = 'dc965fe8-0868-44da-a0df-581010053655'
        const idB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [
          [HTTP.ReasonPhrases.NOT_FOUND],
          [HTTP.ReasonPhrases.NOT_FOUND],
        ]

        // Act
        await get_single({ params: { id: idA } as any })
        await get_single({ params: { id: idB } as any })
        const recieved = [
          res.send.mock.calls[0],
          res.send.mock.calls[1],
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )
  })
})
