import { ValueObjectAbstractImpl } from './value-object-abstract';
import { VOType } from './enum';

export interface TimeRangeVOImplConstructorParameters {
  start: Date;
  finish: Date;
}

export class TimeRangeVOImpl extends ValueObjectAbstractImpl<VOType.TimeRange> {
  public get type(): VOType.TimeRange {
    return VOType.TimeRange;
  }

  public get hash(): string {
    return this._hash;
  }

  public get start(): Date {
    return this._start;
  }

  public get finish(): Date {
    return this._finish;
  }

  protected _hash: string;
  protected _start: Date;
  protected _finish: Date;

  constructor(protected parameters: TimeRangeVOImplConstructorParameters) {
    super();
    if (!parameters) {
      throw new Error('The "parameters" are required');
    }

    const { finish, start } = parameters;

    if (start < finish) {
      throw new Error('Start date should not be greater than the finish date');
    }

    this._start = start;
    this._finish = finish;
    this._hash = this._joinHashParts(this.type, start.toISOString(), finish.toISOString());
  }

  public doesOverlapWith(timeRange: TimeRangeVOImpl): boolean {
    return (
      this._checkIfDateWithinTheTimeRange(timeRange.start) ||
      this._checkIfDateWithinTheTimeRange(timeRange.finish)
    );
  }

  protected _checkIfDateWithinTheTimeRange(date: Date): boolean {
    return this.start > date && this.finish < date;
  }
}
