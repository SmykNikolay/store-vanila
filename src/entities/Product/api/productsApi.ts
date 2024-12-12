import { httpClient } from '../../../shared/api/baseClient';
import type { IProduct, IProductsResponse } from '../model/types.ts';

export class ProductsApi {
  private static _instance: ProductsApi;

  private constructor() {}

  public static getInstance(): ProductsApi {
    if (!ProductsApi._instance) {
      ProductsApi._instance = new ProductsApi();
    }
    return ProductsApi._instance;
  }

  public async getProducts(): Promise<IProductsResponse> {
    return await httpClient.request<IProductsResponse>('/products');
  }

  public async getProduct(id: string): Promise<IProduct> {
    return await httpClient.request<IProduct>(`/products/${id}`);
  }
}

export const productsApi = ProductsApi.getInstance();