import {
  TodoItemAggregateRepositoryListFilter,
  TodoItemAggregateRepositoryListFilterParameters,
} from '@react-node-monorepo/application';
import { JSONSerializerImpl } from '@react-node-monorepo/infrastructure';

export class TodoItemAggregateRepositoryListFilterImpl
  implements TodoItemAggregateRepositoryListFilter
{
  protected parameters?: Partial<TodoItemAggregateRepositoryListFilterParameters>;
  protected _JSONSerializerImpl = new JSONSerializerImpl();
  public create(parameters: Partial<TodoItemAggregateRepositoryListFilterParameters>): void {
    this.parameters = parameters;
  }
  public toQuery(): string {
    const paramsOrUndefined = this.parameters;
    if (!paramsOrUndefined) {
      throw new Error('Parameters should be set');
    }
    return this._JSONSerializerImpl.toString(this.parameters);
  }
}
