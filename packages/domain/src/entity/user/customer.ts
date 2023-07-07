import { UserEntityAbstractImpl } from './user-abstract';
import { EntityType } from '../enum';
import { type CustomerEntity } from './types';

export class CustomerEntityImpl
  extends UserEntityAbstractImpl<EntityType.Customer>
  implements CustomerEntity
{
  public get type(): EntityType.Customer {
    return EntityType.Customer;
  }
}
