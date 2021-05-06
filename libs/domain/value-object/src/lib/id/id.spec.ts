import * as Result from 'neverthrow'
import { v4 } from 'uuid'
import * as Id from './id'

jest.mock('uuid', () => {
  const { version, validate } = jest.requireActual('uuid')
  return {
    v4: jest.fn(),
    version,
    validate,
  }
})

describe('Id Value Object', () => {
  describe('DTO Validation', () => {
    it(
      'produces an ok result containing the given DTO, if the given ' +
        'value is a valid id DTO (i.e. uuid v4).',
      () => {
        // Arrange
        const validIdA = 'dc965fe8-0868-44da-a0df-581010053655'
        const validIdB = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'
        const expected = [Result.ok(validIdA), Result.ok(validIdB)]

        // Act
        const recieved = [
          Id.validate_DTO(validIdA),
          Id.validate_DTO(validIdB),
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'produces an err result containing the string "id must be ' +
        'a uuid string." if the given value is not a valid uuid string',
      () => {
        // Arrange
        const nonUUIDString = 'random-id'
        const expected = Result.err(Id.ERR_TYPE)

        // Act
        const recieved = Id.validate_DTO(nonUUIDString)

        // Assert
        expect(recieved).toEqual(expected)
      }
    )

    it(
      'returns Result.Err<ERR_VERSION> if the given value is not a ' +
        'valid uuid version 4 string.',
      () => {
        // Arrange
        const uuidV1 = 'e4141c50-aa9e-11eb-9375-9ddbe18c35c9'
        const uuidV3 = '641eb357-8761-3f64-b791-b2d4398e8532'
        const uuidV5 = 'f81789d2-8ecc-5d84-b2e8-986e69b7f5d4'

        const expected = [
          Result.err(Id.ERR_VERSION),
          Result.err(Id.ERR_VERSION),
          Result.err(Id.ERR_VERSION),
        ]

        // Act
        const recieved = [
          Id.validate_DTO(uuidV1),
          Id.validate_DTO(uuidV3),
          Id.validate_DTO(uuidV5),
        ]

        // Assert
        expect(recieved).toEqual(expected)
      }
    )
  })

  describe('Model Creation', () => {
    it('generates a new uuid if none is provided by the caller.', () => {
      // Arrange
      const validIdA = 'dc965fe8-0868-44da-a0df-581010053655'

      ;(v4 as jest.MockedFunction<typeof v4>).mockReturnValue(validIdA)
      const expected = { value: validIdA }

      // Act
      const recieved = Id.create()

      // Assert
      expect(recieved).toMatchObject(expected)
    })

    it(
      'uses the given id value to create the value object model if ' +
        'one is provided by the caller.',
      () => {
        // Arrange
        const validIdA = 'dc965fe8-0868-44da-a0df-581010053655'
        const expected = { value: validIdA }

        // Act
        const recieved = Id.create(validIdA)

        // Assert
        expect(recieved).toMatchObject(expected)
      }
    )
  })
})
