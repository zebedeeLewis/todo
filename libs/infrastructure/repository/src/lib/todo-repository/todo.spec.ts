import * as Result from 'neverthrow'
import * as Entity from '@libs/domain/entity'
import * as ValueObject from '@libs/domain/value-object'

import * as TodoRepository from './todo'

describe('find', () => {
  it(
    'returns a Result.OK<Entity.Todo> wrapping the todo item with the ' +
      'matching id.',
    async () => {
      async function do_test(idInput: ValueObject.IdInput) {
        const todoRepo = TodoRepository.create({})
        const id = ValueObject.Id.create(idInput)
        const recieved = await TodoRepository.find(id, todoRepo)

        const todoEntity = Entity.Todo.create({ id: idInput })
        const expected = Result.ok(todoEntity)

        expect(recieved).toEqual(expected)
      }

      await do_test('random-id')
      await do_test('random-id-2')
    }
  )
})
