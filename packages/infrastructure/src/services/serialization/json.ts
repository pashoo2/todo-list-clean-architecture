import type { RecordStringifiableJSONString, Serializer, SimpleStringifiable } from '../../types';

export class JSONSerializerImpl<D extends RecordStringifiableJSONString | SimpleStringifiable>
  implements Serializer<D>
{
  public toString(data: D): string {
    return JSON.stringify(data);
  }
  public parse(dataStringified: string): D {
    return JSON.parse(dataStringified);
  }
}
