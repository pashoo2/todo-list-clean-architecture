export interface DateTimeSerializationService {
  fromString(dateStringified: string): Date;
  toString(date: Date): string;
}
