import { LoaderFunctionArgs } from "react-router";
import { httpRequest } from "../services/initRequest";

export interface ApiLoaderOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  baseUrl?: string;
  headers?: Record<string, string>;
  showSpinner?: boolean;
  transformData?: (data: any) => any;
  validateParams?: (params: Record<string, string | undefined>) => void;
}

export interface ApiLoaderResult<T = any> {
  data: T;
  status: number;
  statusText: string;
}

/**
 * // Simple GET request
 * const employeeListLoader = createApiLoader('/api/employees');
 * 
 * // GET request with parameter
 * const employeeDetailLoader = createApiLoader('/api/employees/:id');
 * 
 * // POST request with custom options
 * const createEmployeeLoader = createApiLoader('/api/employees', {
 *   method: 'POST',
 *   transformData: (data) => ({ employee: data })
 * });
 * 
 * // With parameter validation
 * const employeeDetailLoader = createApiLoader('/api/employees/:id', {
 *   validateParams: (params) => {
 *     if (!params.id) {
 *       throw new Response("Employee ID is required", { status: 400 });
 *     }
 *   }
 * });
 */
export function createApiLoader<T = any>(
  endpoint: string,
  options: ApiLoaderOptions = {}
) {
  const {
    method = 'GET',
    headers = {},
    showSpinner = true,
    transformData,
    validateParams,
    baseUrl = 'http://localhost:3000',
  } = options;

  return async ({ params, request }: LoaderFunctionArgs): Promise<T> => {
    try {
      if (validateParams) {
        validateParams(params);
      }

      let finalEndpoint = endpoint;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          finalEndpoint = finalEndpoint.replace(`:${key}`, value || '');
        });
      }

      let requestBody;
      if (method !== 'GET' && method !== 'DELETE') {
        try {
          requestBody = await request.json();
        } catch {
          requestBody = undefined;
        }
      }

      const response = await httpRequest({
        url: baseUrl + finalEndpoint,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data: requestBody,
        showSpinner,
      });
      const responseData = transformData ? transformData(response.data) : response.data;
      return responseData;
    } catch (error: any) {
      if (error.response) {
        throw new Response(
          error.response.data?.message || error.response.statusText || "Server Error",
          { 
            status: error.response.status,
            statusText: error.response.statusText 
          }
        );
      } else if (error.request) {
        throw new Response("Network Error", { status: 503 });
      } else {
        throw error;
      }
    }
  };
}

/**
 * Creates a simple GET loader for fetching a list of items
 */
export const createListLoader = <T = any>(
  endpoint: string,
  options: Omit<ApiLoaderOptions, 'method'> = {}
) => createApiLoader<T>(endpoint, { ...options, method: 'GET' });

/**
 * Creates a GET loader for fetching a single item by ID
 */
export const createDetailLoader = <T = any>(
  endpoint: string,
  options: Omit<ApiLoaderOptions, 'method'> = {}
) => createApiLoader<T>(endpoint, {
  ...options,
  method: 'GET',
  validateParams: (params) => {
    if (!params.id) {
      throw new Response("ID parameter is required", { status: 400 });
    }
    if (options.validateParams) {
      options.validateParams(params);
    }
  }
});

/**
 * Creates a POST loader for creating items
 */
export const createPostLoader = <T = any>(
  endpoint: string,
  options: Omit<ApiLoaderOptions, 'method'> = {}
) => createApiLoader<T>(endpoint, { ...options, method: 'POST' });

/**
 * Creates a PUT loader for updating items
 */
export const createUpdateLoader = <T = any>(
  endpoint: string,
  options: Omit<ApiLoaderOptions, 'method'> = {}
) => createApiLoader<T>(endpoint, { ...options, method: 'PUT' });

/**
 * Creates a DELETE loader for deleting items
 */
export const createDeleteLoader = <T = any>(
  endpoint: string,
  options: Omit<ApiLoaderOptions, 'method'> = {}
) => createApiLoader<T>(endpoint, { ...options, method: 'DELETE' });
