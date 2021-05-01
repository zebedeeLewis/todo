import * as Result from 'neverthrow'

import * as Id from './id'

const VALID_ID_1 = 'dc965fe8-0868-44da-a0df-581010053655'
const VALID_ID_2 = 'fd26f7f0-8436-4fdd-a25f-4c6a7ac9a009'

const INVALID_ID_RANDOM = 'randome-id'
const INVALID_ID_V1 = 'e4141c50-aa9e-11eb-9375-9ddbe18c35c9'
const INVALID_ID_V3 = '641eb357-8761-3f64-b791-b2d4398e8532'
const INVALID_ID_V5 = 'f81789d2-8ecc-5d84-b2e8-986e69b7f5d4'

describe('validate_DTO', () => {
  it(
    'returns Result.OK<DTO> if the given value is a valid id DTO ' +
      '(i.e. uuid v4).',
    () => {
      const do_test = (id: string) => {
        const recieved = Id.validate_DTO(id)
        const expected = Result.ok(id)

        expect(recieved).toEqual(expected)
      }

      do_test(VALID_ID_1)
      do_test(VALID_ID_2)
    }
  )

  it(
    'returns Result.Err<ERR_TYPE> if the given value is not a ' +
      'valid uuid string.',
    () => {
      const do_test = (id: string) => {
        const recieved = Id.validate_DTO(id)
        const expected = Result.err(Id.ERR_TYPE)

        expect(recieved).toEqual(expected)
      }

      do_test(INVALID_ID_RANDOM)
    }
  )

  it(
    'returns Result.Err<ERR_VERSION> if the given value is not a ' +
      'valid uuid version 4 string.',
    () => {
      const do_test = (id: string) => {
        const recieved = Id.validate_DTO(id)
        const expected = Result.err(Id.ERR_VERSION)

        expect(recieved).toEqual(expected)
      }

      do_test(INVALID_ID_V1)
      do_test(INVALID_ID_V3)
      do_test(INVALID_ID_V5)
    }
  )
})
