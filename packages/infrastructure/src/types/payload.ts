import type { RecordSimpleStringifiableFlatString } from './serialization';

export type PayloadDataSerializable = Record<string, unknown>; // TODO: it should be "RecordStringifiableJSONString"

export type PayloadDataStringifiable = RecordSimpleStringifiableFlatString;
