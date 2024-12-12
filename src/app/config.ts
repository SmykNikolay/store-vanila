export interface AppConfig {
  apiUrl: string;
  isDevelopment: boolean;
}

export const appConfig: AppConfig = {
  apiUrl: import.meta.env["VITE_API_URL"] || 'http://localhost:3000',
  isDevelopment: import.meta.env.DEV
};