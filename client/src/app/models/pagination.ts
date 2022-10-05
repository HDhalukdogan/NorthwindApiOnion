export interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResponse<T> {
    items: T;
    pagination: Pagination;

    constructor(items: T, pagination: Pagination){
        this.items = items;
        this.pagination = pagination;
    }
}