export interface Product {
    title: string;
    image : string;
    price: number;
    category: string;
    description: string;
    options : string;
}

export interface ProductFromDB extends Product {
    id: string;
}