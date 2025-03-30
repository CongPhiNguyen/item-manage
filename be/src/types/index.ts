export type PaginationResult<T> = {
  data: T[],
  size: number,
  page: number,
  total: number
}
