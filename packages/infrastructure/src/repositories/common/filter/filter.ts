import { FilterListParameters, FilterListRepo } from '@react-node-monorepo/application';

import type { RecordSimpleStringifiableFlatString, Serializer } from '../../../types';
import { QueryStringSerializerImpl } from '../../../services';
import { FilterListParametersImpl } from './filter-list-parameters';

export class FilterListImpl<
  P extends FilterListParameters,
  // TODO: P extends FilterListParameters & RecordSimpleStringifiableFlatString>
> implements FilterListRepo<P>
{
  protected _parametersOrUndefined?: P;
  protected _filterListParameters?: FilterListParameters; // TODO: use it
  constructor(
    protected _queryStringSerializer: Serializer<RecordSimpleStringifiableFlatString> = new QueryStringSerializerImpl(),
  ) {}
  public create(parameters: P): void {
    this._parametersOrUndefined = parameters; // TODO: it should filter out all undefined values
    this._filterListParameters = new FilterListParametersImpl(parameters);
  }
  public toQuery(): string {
    const filterParametersOrUndefined = this._parametersOrUndefined;
    if (!filterParametersOrUndefined) {
      throw new Error('Parameters should be set first');
    }
    return this._queryStringSerializer.toString(
      filterParametersOrUndefined as unknown as RecordSimpleStringifiableFlatString, // TODO: resolve
    );
  }
}
