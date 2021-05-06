import * as Result from 'neverthrow'
import * as uuid from 'uuid'
import * as _ from 'underscore'

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
 * Produce the DTO used to create the given Model.
 *
 * @param id - the Id model we want to convert.
 * @returns a new DTO
 *
 * @remarks
 * TODO!!!
 */
export function to_dto(model: Model): DTO {
  return model.value
}

/**
 * Creates a new Id value object Model
 *
 * @param dto - the dto encapsulating the initialization data for the
 * new id value object.
 *
 * @returns a new Id value object Model wrapping one of:
 *   a. a newly generated id value if none is provided
 *   b. the given id if one is provided
 *
 * @remarks
 *   1. We assume that the given dto has been validated using the
 *      "validate_DTO" function above.
 */
export function create(dto?: DTO): Model {
  return new Model(_.isUndefined(dto) ? uuid.v4() : dto)
}
