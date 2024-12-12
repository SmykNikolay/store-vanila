import { router } from './router';
import { appConfig } from './config';

export class App {
  private static _instance: App;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): App {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  private initialize(): void {
    router.initialize();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    window.addEventListener('error', this.handleError.bind(this));
  }

  private handleError(error: ErrorEvent): void {
    console.error('Application Error:', error);
  }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
  App.getInstance();
});