import type {
  RecordSimpleStringifiableFlatString,
  Serializer,
  SimpleStringifiable,
} from '../../types';

export class QueryStringSerializerImpl<
  D extends RecordSimpleStringifiableFlatString | SimpleStringifiable,
> implements Serializer<D>
{
  public toString(data: D): string {
    return data && typeof data === 'object'
      ? new URLSearchParams(
          this._filterOutUndefinedKeys(data) as unknown as Record<string, string>,
        ).toString()
      : String(data);
  }
  public parse(dataStringified: string): D {
    const urlSearchParams = new URLSearchParams(dataStringified);
    const result: Record<string, string> = {};
    for (const [key, value] of urlSearchParams) {
      result[key] = this._convertQueryStringParameterValue(value);
    }
    return result as D;
  }

  protected _convertQueryStringParameterValue(value: string): any {
    // TODO: refactor using a Visitor + Chain of responsibility patterns
    // TODO: on client side it should define a type e.g. wrap a string into '"'.
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (/\d+/.test(value)) {
      return Number(value);
    }
    return value;
  }

  protected _filterOutUndefinedKeys(data: D): D {
    if (!data || typeof data !== 'object') {
      return data;
    }
    if (Array.isArray(data)) {
      return data.filter(value => value != null) as unknown as D;
    }
    const dataFiltered = {} as D;
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        // TODO:: solve any
        (dataFiltered as any)[key] = data[key];
      }
    });
    return dataFiltered;
  }
}
