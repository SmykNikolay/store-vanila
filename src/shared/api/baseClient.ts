import { appConfig } from '../../app/config';

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

export class HttpClient {
  private static _instance: HttpClient;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = appConfig.apiUrl;
  }

  public static getInstance(): HttpClient {
    if (!HttpClient._instance) {
      HttpClient._instance = new HttpClient();
    }
    return HttpClient._instance;
  }

  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const { method = 'GET', headers = {}, body } = options;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }
}

export const httpClient = HttpClient.getInstance();