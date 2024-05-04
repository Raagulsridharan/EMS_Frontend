export class FilterOption{
    pageNo: number = 1;
    pageSize: number = 5;
    searchKey!: string;
    sortBy?: string; // New property for sorting column
    sortOrder?: 'asc' | 'desc'; // New property for sorting order
}