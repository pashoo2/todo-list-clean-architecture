export type SimpleStringifiable = string | boolean | number | null | undefined;

export interface RecordSimpleStringifiableFlatString {
  [key: string | number]: SimpleStringifiable | SimpleStringifiable[];
}

export interface RecordStringifiableJSONString {
  [key: string | number]: RecordSimpleStringifiableFlatString | SimpleStringifiable;
}

export interface Serializer<D> {
  toString(data: D): string;
  parse(dataStringified: string): D;
}
