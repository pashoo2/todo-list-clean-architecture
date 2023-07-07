import type { DateTimeSerializationService } from './types';

export class DateTimeSerializationServiceImpl implements DateTimeSerializationService {
  public fromString(dateStringified: string): Date {
    return new Date(dateStringified);
  }
  public toString(date: Date): string {
    return date.toISOString();
  }
}
