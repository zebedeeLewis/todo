import * as Result from 'neverthrow'
import * as _ from 'underscore'

export const DEFAULT = '[[ enter a details ]]'

/**
 * Describes the format used to describe a todo objects details by
 * functions  outside of this module.
 */
export type DTO = string

/**
 * Represents the detailed description of a single todo item.
 */
export class Model {
  public value: string

  constructor(value: string) {
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
export function validate_DTO(dto: string): Result.Result<DTO, string> {
  return Result.ok(dto)
}

/**
 * Produce the DTO used to create this model
 *
 * @param model - the model we want to convert
 * @returns a new DTO
 * @remarks
 * TODO!!!
 */
export function to_dto(model: Model): DTO {
  return model.value
}

/**
 * Creates a new details value object
 *
 * @param dto - the dto describing the details we want to create.
 *
 * @returns a new details Model wrapping one of:
 *   a. the given value if provided by the caller.
 *   b. a default value if none provided by the caller.
 *
 * @remarks
 *   1. We assume that the given dto has been validated using the
 *      "validate_DTO" function above.
 */
export function create(dto?: DTO): Model {
  return new Model(_.isUndefined(dto) ? DEFAULT : dto)
}
