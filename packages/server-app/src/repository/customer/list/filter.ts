import {
  type CustomerEntityRepositoryListFilter,
  type CustomerEntityRepositoryListFilterParameters,
} from '@react-node-monorepo/application';
import { JSONSerializerImpl } from '@react-node-monorepo/infrastructure';

export class CustomerEntityRepositoryListFilterImpl implements CustomerEntityRepositoryListFilter {
  protected parameters?: Partial<CustomerEntityRepositoryListFilterParameters>;
  protected _JSONSerializerImpl = new JSONSerializerImpl();
  public create(parameters: Partial<CustomerEntityRepositoryListFilterParameters>): void {
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
