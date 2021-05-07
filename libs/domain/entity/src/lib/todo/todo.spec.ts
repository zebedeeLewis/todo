import * as TodoEntity from './todo'
import * as ValueObject from '@libs/domain/value-object'
import * as uuid from 'uuid'

describe('Todo Entity', () => {
  describe('Model creation', () => {
    it(
      'generates a new unique id if none is provided by the ' +
        'caller.',
      () => {
        // Arrange
        const expected = true

        // Act
        const todoEntity = TodoEntity.create({})
        const recieved = uuid.version(todoEntity.id.value) === 4

        // Assert
        expect(recieved).toBe(expected)
      }
    )

    it('uses the given id if one is provided by the caller.', () => {
      // Arrange
      const id = 'dc965fe8-0868-44da-a0df-581010053655'
      const expected = {
        id: { value: id },
      }

      // Act
      const recieved = TodoEntity.create({ id })

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it('uses the given "title" if one is provided by the caller.', () => {
      // Arrange
      const title = 'random todo title'
      const expected = {
        title: { value: title },
      }

      // Act
      const recieved = TodoEntity.create({ title })

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it('uses a default title if none is provided by the caller.', () => {
      // Arrange
      const expected = {
        title: { value: ValueObject.Title.DEFAULT },
      }

      // Act
      const recieved = TodoEntity.create({})

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it('uses the given "details" if one is provided by the caller.', () => {
      // Arrange
      const details = 'random details'
      const expected = {
        details: { value: details },
      }

      // Act
      const recieved = TodoEntity.create({ details })

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it('uses a default "details" if none is provided by the caller.', () => {
      // Arrange
      const expected = {
        details: { value: ValueObject.Details.DEFAULT },
      }

      // Act
      const recieved = TodoEntity.create({})

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it(
      'uses the given "creation time" if one is provided by the ' +
        'caller.',
      () => {
        // Arrange
        const expected = Date.UTC(90, 8, 14) // Sept 14, 1990

        // Act
        const todoEntity = TodoEntity.create({ creationTime: expected })
        const recieved = todoEntity.creationTime.value.valueOf()

        // Assert
        expect(recieved).toBe(expected)
      }
    )

    it(
      'uses the current date and time as the "creation time" if ' +
        'none provided by the caller.',
      () => {
        // Arrange
        const expected = Date.UTC(90, 8, 14) // Sept 14, 1990
        Date.now = jest.fn().mockReturnValue(expected)

        // Act
        const todoEntity = TodoEntity.create({})
        const recieved = todoEntity.creationTime.value.valueOf()

        // Assert
        expect(recieved).toBe(expected)
      }
    )
  })

  describe('Model to DTO conversion', () => {
    it('produces the DTO for the given model.', () => {
      // Arrange
      const creationTime = Date.UTC(2021, 4, 7) // May 7, 2021
      const completionTime = Date.UTC(2021, 5, 7) // June 7, 2021
      const dto = {
        id: '109156be-c4fb-41ea-b1b4-efe1671c5836',
        title: 'random title',
        details: 'random details',
        creationTime,
        completionTime,
      }
      const todoEntity = TodoEntity.create(dto)
      const expected = dto

      // Act
      const recieved = TodoEntity.to_dto(todoEntity)

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it(
      'sets the "completionTime" property of the new DTO to ' +
        'undefined if the corresponding Model completionTime is ' +
        'null.',
      () => {
        // Arrange
        const todoEntity = TodoEntity.create({})
        const expected = { completionTime: undefined }

        // Act
        const recieved = TodoEntity.to_dto(todoEntity)

        // Assert
        expect(recieved).toMatchObject(expected)
      }
    )
  })
})
