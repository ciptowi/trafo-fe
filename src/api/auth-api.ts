import { client } from "../config/client";
import type { BaseResponse } from "../types/global-type";

type LoginReq = { username: string; password: string };

type Res<T> = Promise<BaseResponse<T>>;
type LoginRes = { access_token: string; token_type: string } | null;

class AuthApi {
  async login({ username, password }: LoginReq) {
    const data = { username, password };
    return await client.post<Res<LoginRes>>("/login", data);
  }
}

export const authApi = new AuthApi();
