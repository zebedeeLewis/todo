import * as Result from 'neverthrow'

import * as ValueObject from '@libs/domain/value-object'

/**
 * Describes the argument object provided to TodoEntity.create
 * to create a new TodoEntity.
 */
export interface DTO {
  id: ValueObject.Id.DTO
}

/**
 * Represents a single task to be completed at a later time.
 */
export class Model {
  public id: ValueObject.Id.Model

  constructor(id: ValueObject.Id.Model) {
    this.id = id
  }
}

/**
 * Create a todo entity DTO from the given todo entity.
 *
 * @param todoEntity - the todo entity to represent as a DTO
 *
 * @returns a new DTO
 *
 * @remarks
 * TODO!!!
 */
export function to_DTO(todoEntity: Model): DTO {
  return {
    id: todoEntity.id.value,
  }
}

/**
 * Validate a given todo entity DTO.
 *
 * @param dto - the DTO to validate
 * @returns
 *
 * @remarkS
 * TODO!!!
 */
export function validate_DTO(
  dto: Partial<DTO>
): Result.Result<Partial<DTO>, string> {
  return Result.ok(dto)
}

/**
 * Creates a new TodoEntity
 *
 * @param todoDTO - input to create a new todo model
 *
 * @returns a new todo entity model.
 *
 *
 * @remarks
 *   1. We assume that the given DTO has been validated using the
 *      "validate_DTO" function above.
 *
 * TODO!!!
 */
export function create(todoDTO: Partial<DTO>): Model {
  return new Model(ValueObject.Id.create(todoDTO.id))
}
