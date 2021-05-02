import * as Result from 'neverthrow'

import * as ValueObject from '@libs/domain/value-object'
import * as Entity from '@libs/domain/entity'

/**
 * Describes persistent storage for a todo item.
 *
 * TODO!!!
 */
export class Model {
  constructor() {
    console.log('')
  }
}

/**
 * Describes the argument object provided to TodoRepository.create
 * to create a new TodoRepository.
 */
export interface DTO {}

/**
 * Validate the given dto.
 *
 * @param dto - the dto to validate.
 * @returns
 *
 * @remarks
 * TODO!!!
 */
export function validate_DTO(
  dto: Partial<DTO>
): Result.Result<Partial<DTO>, string> {
  return Result.ok(dto)
}

/**
 * Create a new todo repository Model.
 *
 * @param todoDTO - the input
 *
 * @returns one of:
 *   a. Result.OK<Model> if the Model has been successfuly created
 *
 * @remarks
 * TODO!!!
 */
export function create(todoDTO: Partial<DTO>): Model {
  return new Model()
}

/**
 * find the todo item with the given "id" in the
 * given repository.
 *
 * @param id - the id of the todo item we want to find
 * @param todoRepo - the repository we want to search in.
 *
 * @returns a Promise encapsulating one of:
 *   a. a Result.OK<Entity.Todo> wrapping the todo item with the
 *      matching id.
 *   b. a Result.Err<string> wrapping a string describing the error.
 *
 * @remarks
 * TODO!!!
 */
export async function find(
  id: ValueObject.Id.DTO,
  todoRepo: Model
): Promise<Result.Result<Entity.Todo.DTO, string>> {
  return Result.ok({ id })
}
