import * as Result from 'neverthrow'

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
 * Creates a new IdValueObject
 *
 * TODO!!!
 */
export function create(idDTO: DTO): Result.Result<Model, string> {
  return Result.ok(new Model(idDTO))
}
