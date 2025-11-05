import { authApi } from "../api/auth-api";
import { router } from "../router";
import { setAuth } from "../utils/auth-storage";

type LoginArgs = { username: string; password: string; errorMessage: string };

class AuthService {
  async login(param: LoginArgs) {
    try {
      param.errorMessage = "";
      const result = await authApi.login(param);

      if (result.success && result.data) {
        setAuth(result.data.access_token);
        router.push({ name: "trafo" });
      }
    } catch (error) {
      const e = error as Error;
      param.errorMessage = e.message;
    }
  }
}

export const authService = new AuthService();
