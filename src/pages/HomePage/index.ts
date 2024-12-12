import { Page } from "../../shared/components/Page";

export class HomePage extends Page {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <div class="home-page">
        <h1>Добро пожаловать в наш магазин</h1>
        <div class="featured-products">
          <h2>Популярные товары</h2>
          <!-- Здесь будут карточки товаров -->
        </div>
      </div>
      <style>
        .home-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    `;
  }
}

customElements.define('home-page', HomePage);