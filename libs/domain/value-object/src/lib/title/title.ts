import * as Result from 'neverthrow'
import * as _ from 'underscore'

export const DEFAULT = '[[ enter a title ]]'

/**
 * Describes the format used to describe a todo objects title by
 * functions  outside of this module.
 */
export type DTO = string

/**
 * Represents a short descriptive title for a single todo item.
 */
export class Model {
  public value: string

  constructor(value: string) {
    this.value = value
  }
}

/**
 * Check if the title DTO provided is valid.
 *
 * @param dto - the dto we want to validate
 * @returns one of:
 *   a. Result.OK<DTO> if the given value is a valid title DTO
 *
 * @remarks
 * TODO!!!
 */
export function validate_DTO(dto: string): Result.Result<DTO, string> {
  return Result.ok(dto)
}

/**
 * Produce the DTO used to create the given model
 *
 * @param model - the model we want to convert
 *
 * @returns the DTO that corresponds to the given model.
 */
export function to_dto(model: Model): DTO {
  return model.value
}

/**
 * Creates a new title value object
 *
 * @param dto - the dto describing the title we want to create.
 *
 * @returns a new title Model wrapping one of:
 *   a. the given title if one is provided by the caller.
 *   b. a default value if no title is provided by the caller.
 *
 * @remarks
 *   1. We assume that the given dto has been validated using the
 *      "validate_DTO" function above.
 */
export function create(dto?: DTO): Model {
  return new Model(_.isUndefined(dto) ? DEFAULT : dto)
}
