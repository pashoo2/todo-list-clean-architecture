export interface HttpError extends Error {
  readonly statusCode: Response['status'];
}
