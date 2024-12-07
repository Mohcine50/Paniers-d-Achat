export interface PRODUCT {
    _id	:string,
    ProductID:	number,
    ProductName:	string,
    Category:	string,
    Price:	number,
    salesCount:	number
}

export interface DASHDATA {
    totalSales	: number,
    totalOrders	: number,
    totalProducts	: number,
    totalCategories	: number,
}

export interface CATEGORIESALES {
    salesCount: number;
    category: string;
    percentage: number;
}

export interface TRENDPRODUCT {
    _id	: number
    productName: string
    totalQuantitySold: number
    totalSalesAmount: number
    category:string
}

export type FILTER = 'week' |'month' |'year'