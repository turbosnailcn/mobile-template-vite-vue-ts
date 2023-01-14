export interface ReqParams {
  mobile: string;
  password: string;
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface ResResult {
  login_status: number;
  st: string;
  token: string;
}

// declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req = { url: "https://example.com", method: "GET" } as const;
// handleRequest(req.url, req.method);
