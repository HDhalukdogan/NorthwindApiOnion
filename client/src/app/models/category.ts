import { Product } from "./product";

export interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
    products: Product[];
}