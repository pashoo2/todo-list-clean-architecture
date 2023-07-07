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
      ? new URLSearchParams(data as unknown as Record<string, string>).toString()
      : String(data);
  }
  public parse(dataStringified: string): D {
    const urlSearchParams = new URLSearchParams(dataStringified);
    const result: Record<string, string> = {};
    for (const [key, value] of urlSearchParams) {
      result[key] = value;
    }
    return result as D;
  }
}
