import {
  TodoItemAggregateRepositoryListFilter,
  TodoItemAggregateRepositoryListFilterParameters,
} from '@react-node-monorepo/application';
import { FilterListImpl } from '../../common';

export class TodoItemAggregateRepositoryListFilterImpl
  extends FilterListImpl<TodoItemAggregateRepositoryListFilterParameters>
  implements TodoItemAggregateRepositoryListFilter {}
