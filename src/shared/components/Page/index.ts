export abstract class Page extends HTMLElement {
  protected constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  protected abstract render(): string;

  connectedCallback(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.render();
    }
  }
}