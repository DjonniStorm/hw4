import { makeAutoObservable, runInAction } from "mobx";
import type { UserAuth, LoginData, User } from "@/shared/types";
import { api } from "../api";
import { AVAILABLE_ENDPOINTS } from "../config";

class AuthStore {
  user: UserAuth | undefined;
  isLoading = false;
  isAuthenticated = false;
  error: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (data: LoginData) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = undefined;
    });

    try {
      await api.post(AVAILABLE_ENDPOINTS.auth.login, data);

      const whoami = await api.get<{
        sub: string;
        email: string;
      }>(AVAILABLE_ENDPOINTS.auth.me);

      const user = await api.get<User>(
        `${AVAILABLE_ENDPOINTS.users.getById(whoami.sub)}`
      );

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : JSON.stringify(e);
      });
      throw e;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  checkAuth = async () => {
    // Если уже авторизован, не проверяем
    if (this.isAuthenticated && this.user) {
      return;
    }

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const whoami = await api.get<{
        sub: string;
        email: string;
      }>(AVAILABLE_ENDPOINTS.auth.me);

      const user = await api.get<User>(
        `${AVAILABLE_ENDPOINTS.users.getById(whoami.sub)}`
      );

      if (!user) {
        throw new Error("User not found");
      }

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });
    } catch (e) {
      console.error("Auth check failed:", e);
      runInAction(() => {
        this.user = undefined;
        this.isAuthenticated = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  logout = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      await api.post(AVAILABLE_ENDPOINTS.auth.logout, {});
    } finally {
      runInAction(() => {
        this.user = undefined;
        this.isAuthenticated = false;
        this.isLoading = false;
      });
    }
  };
}

export const authStore = new AuthStore();
