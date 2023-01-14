import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

// baseURL
const BASE_URL =
  import.meta.env.MODE === "development"
    ? (import.meta.env.VITE_GLOB_API_URL as string)
    : "";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

const request = <T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  if (typeof config === "string") {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      });
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      });
    }
  } else {
    return instance.request<T, T>(config);
  }
};

export function get<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return request({ ...config, method: "GET" }, options);
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return request({ ...config, method: "POST" }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
