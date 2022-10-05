import { Product } from "./product";

export interface Supplier {
    supplierId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region?: any;
    postalCode: string;
    country: string;
    phone: string;
    fax?: any;
    homePage?: any;
    products: Product[];
}