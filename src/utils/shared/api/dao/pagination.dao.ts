export class PaginatedResultDao<T> {
  readonly data: T[];
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly currentPage: number;
  readonly pageSize: number;
}
