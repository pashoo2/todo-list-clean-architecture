import { EntityType, type Entity } from '@react-node-monorepo/domain';

export interface ListFromStorage<T> {
  values: T[];
  offset: number;
  total: number;
}

export interface FilterListParameters {
  readonly offset: number;
  readonly count: number;
}

export interface Filter<P> {
  create(parameters: P): void;
  toQuery(): string;
}

export type FilterListRepo<P extends FilterListParameters> = Filter<P>;

export interface CompositeFilter<F extends Filter<unknown>> {
  compose(...filters: F[]): void;
  toQuery(): string;
}

export interface OperationResult<R> {
  isSuccess: boolean;
  result: this['isSuccess'] extends false ? Error : R;
}

export type OperationResultAsync<R> = Promise<OperationResult<R>>;

export type OperationResultFailure<OR extends OperationResult<unknown>> = OR extends {
  isSuccess: false;
}
  ? Error
  : never;

export type OperationResultSuccess<OR extends OperationResult<unknown>> =
  OR extends OperationResult<infer R> & { isSuccess: true } ? R : never;

export interface EntityCRUDRepo<E extends Entity<EntityType>> {
  create(entity: E): OperationResultAsync<E>;
  read(id: string): OperationResultAsync<E | undefined>;
  update(entity: E): OperationResultAsync<void>;
  delete(id: string): OperationResultAsync<void>;
}

export interface EntityListRepo<
  E extends Entity<EntityType>,
  F extends FilterListRepo<FilterListParameters>,
> {
  read(filter: F): OperationResultAsync<ListFromStorage<E>>;

  // TODO: read(compositeFilter: CompositeFilter<F>): Promise<OperationResult<List<E>>>;
}
