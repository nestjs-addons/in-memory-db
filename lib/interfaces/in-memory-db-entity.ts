export type EntityIDType = string | number;

export interface Dictionary<T> {
  [id: string]: T;
}
export interface Entity<R> {
  ids: EntityIDType[];
  records: Dictionary<R>;
}
