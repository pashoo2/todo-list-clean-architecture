import type { OperationResult, TodoItemAggregateRepositoryCRUD } from '../../repository';
import type { UseCase } from '../types';

export type CustomerEntityUseCaseTodoItemRemoveAllParameters = void;

export type CustomerEntityUseCaseTodoItemRemoveAllResult = Promise<void>;

export class CustomerEntityUseCaseTodoItemRemoveAllImpl
  implements
    UseCase<
      CustomerEntityUseCaseTodoItemRemoveAllParameters,
      CustomerEntityUseCaseTodoItemRemoveAllResult
    >
{
  constructor(protected readonly _todoItemAggregateCRUD: TodoItemAggregateRepositoryCRUD) {}

  public async run(): CustomerEntityUseCaseTodoItemRemoveAllResult {
    const result: OperationResult<void> = await this._todoItemAggregateCRUD.removeAll();

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
