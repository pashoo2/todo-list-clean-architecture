import { ValueObjectAbstractImpl } from '../value-object-abstract';
import { TodoItemVOType } from './enum';
import type { TodoItemDescriptionVO } from './types';

export class ToDoItemDescriptionVOImpl
  extends ValueObjectAbstractImpl<TodoItemVOType.TaskDescription>
  implements TodoItemDescriptionVO
{
  public get type(): TodoItemVOType.TaskDescription {
    return TodoItemVOType.TaskDescription;
  }

  public get hash(): string {
    return this._hash;
  }

  protected _hash: string;

  constructor(public readonly description: string) {
    super();
    if (!description) {
      throw new Error('The task description should not be empty');
    }
    if (description.length < 1) {
      throw new Error('The task description should be at least a character long');
    }
    this._hash = this._joinHashParts(this.type, description.toLowerCase());
  }
}
