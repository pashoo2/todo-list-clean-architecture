export interface CompareForSortFunction<V> {
  (first: V, second: V): number;
}
