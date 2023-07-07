import { UserEntityAbstractImpl } from './user-abstract';
import { EntityType } from '../enum';
import { type AdminEntity } from './types';

export class AdminEntityImpl
  extends UserEntityAbstractImpl<EntityType.Admin>
  implements AdminEntity
{
  public get type(): EntityType.Admin {
    return EntityType.Admin;
  }
}
