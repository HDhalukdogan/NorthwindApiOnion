export interface Product {
    productId: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    categoryName: string;
    supplierName: string;
}

export interface ProductParams {
    orderBy?: string;
    searchTerm?: string;
    categoryId?: number;
    supplierId?: number;
    pageNumber: number;
    pageSize: number;
}