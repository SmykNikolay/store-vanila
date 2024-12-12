import { Page } from "../../shared/components/Page";
import { productsApi } from "../../entities/Product/api/productsApi";
import type { IProduct } from "../../entities/Product/model/types.ts";

export class ProductsPage extends Page {
  private products: IProduct[] = [];

  constructor() {
    super();
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      const response = await productsApi.getProducts();
      this.products = response.products;
      this.update();
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }

  private update(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.render();
    }
  }

  private renderProductCard(product: IProduct): string {
    return `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">${product.price} ₽</div>
        <button onclick="addToCart('${product.id}')">В корзину</button>
      </div>
    `;
  }

  protected render(): string {
    return `
      <div class="products-page">
        <h1>Наши товары</h1>
        <div class="products-grid">
          ${this.products.map(product => this.renderProductCard(product)).join('')}
        </div>
      </div>
      <style>
        .products-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px 0;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        .product-card img {
          width: 100%;
          height: auto;
          max-height: 200px;
          object-fit: cover;
        }
        .price {
          font-size: 1.2em;
          font-weight: bold;
          color: #2c3e50;
          margin: 10px 0;
        }
        button {
          background-color: #42b883;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #3aa876;
        }
      </style>
    `;
  }
}

customElements.define('products-page', ProductsPage);