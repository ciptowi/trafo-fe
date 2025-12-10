import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  exp: number;
  group_id: number | null;
  group_name: string | null;
};

type UserDetail = {
  username: string;
  group_id: number | null;
  group_name: string | null;
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

export function getUser(): UserDetail {
  const token = getAuth();
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      username: decoded.sub,
      group_id: decoded.group_id,
      group_name: decoded.group_name,
    };
  }
  return {
    username: "",
    group_id: null,
    group_name: null,
  };
}
