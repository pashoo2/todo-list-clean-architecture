import { ok as assert } from 'assert';
import { EntityType } from '@react-node-monorepo/domain';

import { type DTOForEntityCommonFields } from './types';

export type DTOForEntityAbstractImplConstructorParameters<T extends EntityType> =
  DTOForEntityCommonFields<T>;

export abstract class DTOForEntityAbstractImpl<T extends EntityType>
  implements DTOForEntityCommonFields<T>
{
  public readonly id: DTOForEntityCommonFields<T>['id'];
  public readonly type: DTOForEntityCommonFields<T>['type'];
  public readonly dateCreated: DTOForEntityCommonFields<T>['dateCreated'];
  public readonly dateModified: DTOForEntityCommonFields<T>['dateModified'];
  constructor(parameters: DTOForEntityAbstractImplConstructorParameters<T>) {
    assert(parameters, '"parameters" are not defined');

    const { id, type, dateCreated, dateModified } = parameters;

    assert(typeof id === 'string', '"id" value should be a string');
    assert(type, '"type" is not defined');

    this.type = type;
    this.id = id;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
  }
}
