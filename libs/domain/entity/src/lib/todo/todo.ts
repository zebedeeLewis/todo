import * as Result from 'neverthrow'
import * as _ from 'underscore'

import * as ValueObject from '@libs/domain/value-object'

/**
 * Describes the argument object provided to TodoEntity.create
 * to create a new TodoEntity.
 */
export interface DTO {
  id: ValueObject.Id.DTO
  title: ValueObject.Title.DTO
  details: ValueObject.Details.DTO
  creationTime: ValueObject.DateTime.DTO
  completionTime: ValueObject.DateTime.DTO
}

/**
 * Represents a single task to be completed at a later time.
 */
export class Model {
  /**
   * Unique identifier for this todo item
   */
  public id: ValueObject.Id.Model

  /**
   * A short descriptive title for this todo item.
   */
  public title: ValueObject.Title.Model

  /**
   * Detail description of the todo item.
   */
  public details: ValueObject.Details.Model

  /**
   * The date and time when this todo item was created
   */
  public creationTime: ValueObject.DateTime.Model

  /**
   * The date and time when this todo item was completed
   */
  public completionTime: null | ValueObject.DateTime.Model

  constructor(
    id: ValueObject.Id.Model,
    title: ValueObject.Title.Model,
    details: ValueObject.Details.Model,
    creationTime: ValueObject.DateTime.Model,
    completionTime: null | ValueObject.DateTime.Model
  ) {
    this.id = id
    this.title = title
    this.details = details
    this.creationTime = creationTime
    this.completionTime = completionTime
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
export function to_dto(todoEntity: Model): DTO {
  return {
    id: ValueObject.Id.to_dto(todoEntity.id),
    title: ValueObject.Title.to_dto(todoEntity.title),
    details: ValueObject.Details.to_dto(todoEntity.details),
    creationTime: ValueObject.DateTime.to_dto(todoEntity.creationTime),
    completionTime: ValueObject.DateTime.to_dto(
      todoEntity.completionTime
    ),
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
 * Creates a new todo entity model
 *
 * @param todoDTO - input to create a new todo model
 *
 * @returns a new todo entity model with the properties set as follows:
 *   a. "id" property is set to a newly generated id if no id is
 *      provided. Otherwise the "id" property is set to the given id.
 *   b. "title" property is set to the given title if one is provided.
 *      otherwise, it is set to the default value.
 *   c. "details" property is set to the given value if provided.
 *      Otherwise, it is set to the default value.
 *   d. "creationTime" is set to the given value if provided. Otherwise,
 *      it is set to the current date and time.
 *   e. "completionTime" is set to the given value if provided. Otherwise,
 *      it is set to null.
 *
 *
 * @remarks
 *   1. We assume that the given DTO has been validated using the
 *      "validate_DTO" function above.
 */
export function create({
  id,
  title,
  details,
  creationTime,
  completionTime,
}: Partial<DTO>): Model {
  const effectiveCompletionTime = _.isUndefined(completionTime)
    ? null
    : ValueObject.DateTime.create(completionTime)

  return new Model(
    ValueObject.Id.create(id),
    ValueObject.Title.create(title),
    ValueObject.Details.create(details),
    ValueObject.DateTime.create(creationTime),
    effectiveCompletionTime
  )
}
