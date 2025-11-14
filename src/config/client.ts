import { usePopup } from "../components/app/dialog-state";
import { router } from "../router";
import { getAuth, removeAuth } from "../utils/auth-storage";

export type HttpMethod = "GET" | "POST";

export interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  hidePopup?: boolean;
}

class BaseClient {
  private baseUrl: string = "http://127.0.0.1:8000";

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, headers, ...rest } = options;
    const token = getAuth();
    const url = this.buildUrl(endpoint, params);

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
        ...headers,
      },
      ...rest,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMsg = `${response.status} ${response.statusText}`;

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.statusText === "Unauthorized"
      ) {
        removeAuth();
        router.push({ name: "login", query: { message: errorMsg } });
      }

      try {
        const err = await response.json();
        errorMsg = err.message || errorMsg;
        if (!options.hidePopup) usePopup({ type: "error", message: errorMsg });
      } catch {}
      throw new Error(errorMsg);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text() as unknown as T;
    }
  }

  private async requestForm<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, headers, ...rest } = options;
    const token = getAuth();
    const url = this.buildUrl(endpoint, params);

    const config: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: token } : {}),
        ...headers,
      },
      body,
      ...rest,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMsg = `${response.status} ${response.statusText}`;

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.statusText === "Unauthorized"
      ) {
        removeAuth();
        router.push({ name: "login", query: { message: errorMsg } });
      }

      try {
        const err = await response.json();
        errorMsg = err.message || errorMsg;
        if (!options.hidePopup) usePopup({ type: "error", message: errorMsg });
      } catch {}
      throw new Error(errorMsg);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text() as unknown as T;
    }
  }

  private async download(
    method: HttpMethod,
    endpoint: string,
    defaultFileName: string,
    options: RequestOptions = {}
  ) {
    const { params, headers, ...rest } = options;
    const token = getAuth();
    const url = this.buildUrl(endpoint, params);

    const config: RequestInit = {
      method,
      headers: {
        ...(token ? { Authorization: token } : {}),
        ...headers,
      },
      ...rest,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      const errorMsg = `Gagal mengunduh: Status ${response.status}, ${errorText}`;
      usePopup({ type: "error", message: errorMsg });
      throw new Error(errorMsg);
    }

    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = defaultFileName;

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?$/i);
      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1].trim();
      }
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    usePopup({
      type: "success",
      message: `File '${fileName}' berhasil diunduh.`,
    });
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>("POST", endpoint, body, options);
  }

  getNoPopup<T>(endpoint: string, options?: RequestOptions) {
    options = options || {};
    options.hidePopup = true;
    return this.request<T>("GET", endpoint, undefined, options);
  }

  postNoPopup<T>(endpoint: string, body?: any, options?: RequestOptions) {
    options = options || {};
    options.hidePopup = true;
    return this.request<T>("POST", endpoint, body, options);
  }

  postForm<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.requestForm<T>(endpoint, body, options);
  }

  getDownload(endpoint: string, fileName: string, options?: RequestOptions) {
    return this.download("GET", endpoint, fileName, options);
  }
}

export const client = new BaseClient();
