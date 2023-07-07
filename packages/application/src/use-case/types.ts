export interface UseCase<P, R> {
  run(parameters: P): R; // TODO: return a cancellable task
}
