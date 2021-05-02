import * as Result from 'neverthrow'
import * as uuid from 'uuid'

export const ERR_TYPE = 'id must be a uuid string.'
export const ERR_VERSION = 'id must be a uuid version 4 string.'

export const UUID_VERSION = 4

/**
 * Describes the argument object provided to IdValueObject.create
 * to create a new ValueObject.
 */
export type DTO = string

/**
 * Describes a uniqe identifier.
 */
export class Model {
  public value: string

  constructor(value: string) {
    this.value = value
  }
}

/**
 * Check if the id DTO provided is valid.
 *
 * @param dto - the dto we want to validate
 * @returns one of:
 *   a. Result.OK<DTO> if the given value is a valid id DTO (i.e.
 *      uuid v4)
 *
 *   b. Result.Err<ERR_TYPE> if the given value is not a uuid string
 *
 *   b. Result.Err<ERR_VERSION> if the given value is not a uuid
 *      version 4 string
 *
 * @remarks
 */
export function validate_DTO(dto: string): Result.Result<DTO, string> {
  if (!uuid.validate(dto)) {
    return Result.err(ERR_TYPE)
  }

  if (uuid.version(dto) !== UUID_VERSION) {
    return Result.err(ERR_VERSION)
  }

  return Result.ok(dto)
}

/**
 * Creates a new IdValueObject
 *
 * @param dto - the dto encapsulating the initialization data for the
 * new id value object.
 *
 * @returns
 *
 * @remarks
 *   1. We assume that the given dto has been validated using the
 *      "validate_DTO" function above.
 * TODO!!!
 */
export function create(dto: DTO): Model {
  return new Model(dto)
}
