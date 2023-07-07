export type EntityUniqueId = string;

export interface EntityUniqueIdGenerator {
  (): EntityUniqueId;
}
