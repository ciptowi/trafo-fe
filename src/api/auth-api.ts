import { client } from "../config/client";
import type { BaseResponse } from "../types/global-type";

type LoginReq = { username: string; password: string };

type Res<T> = Promise<BaseResponse<T>>;
type LoginRes = { access_token: string; token_type: string } | null;

class AuthApi {
  async login({ username, password }: LoginReq) {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    return await client.postForm<Res<LoginRes>>("/login", formData, options);
  }
}

export const authApi = new AuthApi();
