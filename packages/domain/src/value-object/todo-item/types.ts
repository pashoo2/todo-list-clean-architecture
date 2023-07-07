import type { ValueObject } from '../types';
import type { TodoItemVOType } from './enum';

export interface TodoItemDescriptionVO extends ValueObject<TodoItemVOType.TaskDescription> {
  readonly type: TodoItemVOType.TaskDescription;
  readonly description: string;
}
