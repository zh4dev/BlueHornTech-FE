export interface iResponseList<T> {
  list: T[] | null;
  pageNumber: number;
  totalItems: number;
  totalPages: number;
}
