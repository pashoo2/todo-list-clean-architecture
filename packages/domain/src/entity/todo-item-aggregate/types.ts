import type { TodoItemDescriptionVO } from '../../value-object';
import type { EntityType } from '../enum';
import type { Entity, EntityData } from '../types';
import type { CustomerEntity } from '../user';

export interface TodoItemAggregateData extends EntityData<EntityType.TodoItem> {
  readonly description: TodoItemDescriptionVO;
  readonly isDone: boolean;
  readonly user: CustomerEntity;
}

export interface TodoItemAggregate extends Entity<EntityType.TodoItem>, TodoItemAggregateData {
  setIsDone(isDone: boolean): void;
  unsetIsDone(): void;
  setDescription(description: TodoItemDescriptionVO): void;
}
