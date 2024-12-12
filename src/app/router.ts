import { HomePage, ProductsPage } from "../pages";

type Route = {
  path: string;
  component: () => Promise<any>;
};

export class Router {
  private static _instance: Router;
  private routes: Route[] = [ {
    path: '/',
    component: async () => new HomePage()
  },
  {
    path: '/products',
    component: async () => new ProductsPage()
  }];

  private constructor() {
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  public static getInstance(): Router {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  public initialize(): void {
    window.addEventListener('popstate', this.handleRouteChange);
    this.handleRouteChange();
  }

  private async handleRouteChange(): Promise<void> {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path);
    
    if (route) {
      const component = await route.component();
      this.render(component);
    } else {
      // Handle 404
      this.handleNotFound();
    }
  }

  private render(component: any): void {
    const root = document.querySelector('#app');
    if (root) {
      root.innerHTML = '';
      root.appendChild(component);
    }
  }

  private handleNotFound(): void {
    const root = document.querySelector('#app');
    if (root) {
      root.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }
}

export const router = Router.getInstance();