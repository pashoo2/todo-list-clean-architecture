export interface EntityData<T> {
  readonly type: T;
  readonly id: string;
  readonly dateCreated?: Date;
  readonly dateModified?: Date;
}

export interface Entity<T> extends EntityData<T> {
  isEqualTo(entity: Entity<T>): boolean;
}
