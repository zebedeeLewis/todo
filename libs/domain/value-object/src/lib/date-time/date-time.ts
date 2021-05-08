import * as Result from 'neverthrow'
import * as _ from 'underscore'

/**
 * Describes the format used to describe a date/time object by functions
 * outside of this module. This value should be a date string in ISO 1801
 * format.
 *
 * TODO: change the date DTO to be a date string in ISO 1601 format.
 */
export type DTO = string

/**
 * Represents the date and time an event occured.
 */
export class Model {
  public value: Date

  constructor(value: Date) {
    this.value = value
  }
}

/**
 * Check if the DTO provided is valid.
 *
 * @param dto - the dto we want to validate
 * @returns one of:
 *   a. Result.OK<DTO> if the given value is a valid DTO
 *
 * @remarks
 * TODO!!!
 */
export function validate_DTO(dto: DTO): Result.Result<DTO, string> {
  return Result.ok(dto)
}

/**
 * Produce the DTO used to create this model.
 *
 * @param model - the model we want to convert.
 *
 * @returns the DTO corresponding to the given model.
 */
export function to_dto(model: Model): DTO {
  return model.value.toISOString()
}

/**
 * Creates a new date/time value object
 *
 * @param dto - the dto describing the date/time object we want to create.
 *
 * @returns a new details Model wrapping one of:
 *   a. the given date/time value if provided by the caller.
 *   b. the current date and time if none provided by the caller.
 *
 * @remarks
 *   1. We assume that the given dto has been validated using the
 *      "validate_DTO" function above.
 */
export function create(dto?: DTO): Model {
  const dateObject = new Date(_.isUndefined(dto) ? Date.now() : dto)
  return new Model(dateObject)
}
