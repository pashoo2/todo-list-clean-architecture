import { Entity } from './types';

export interface EntityAbstractConstructorParameters {
  id: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export abstract class EntityAbstract<T> implements Entity<T> {
  public get id(): string {
    return this._id;
  }

  public get dateCreated(): Date | undefined {
    return this._dateCreated;
  }

  public get dateModified(): Date | undefined {
    return this._dateModified;
  }

  abstract readonly type: T;

  protected _id = '';

  protected _dateCreated?: Date;

  protected _dateModified?: Date;

  constructor(parameters: EntityAbstractConstructorParameters) {
    const { id, dateCreated, dateModified } = parameters;

    this._id = id;
    this._dateCreated = dateCreated;
    this._dateModified = dateModified;
  }

  public isEqualTo(entity: Entity<T>): boolean {
    return this.type === entity.type && this.id === entity.id;
  }

  protected _setDateModifiedToCurrentDate(): void {
    this._dateModified = new Date();
  }
}
