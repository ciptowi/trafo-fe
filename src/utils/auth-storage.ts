import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  exp: number;
};

const KEY = "auth";

export function setAuth(value: string): void {
  localStorage.setItem(KEY, value);
}

export function getAuth(): string | null {
  return localStorage.getItem(KEY);
}

export function removeAuth(): void {
  localStorage.removeItem(KEY);
}

export function getUser(): string {
  const token = getAuth();
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.sub;
  }
  return "";
}
