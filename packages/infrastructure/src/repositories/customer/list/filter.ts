import {
  CustomerEntityRepositoryListFilter,
  CustomerEntityRepositoryListFilterParameters,
} from '@react-node-monorepo/application';
import { FilterListImpl } from '../../common';

export class CustomerEntityRepositoryListFilterImpl
  extends FilterListImpl<CustomerEntityRepositoryListFilterParameters>
  implements CustomerEntityRepositoryListFilter {}
