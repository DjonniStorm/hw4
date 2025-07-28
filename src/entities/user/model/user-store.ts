import { api } from "@/shared/api";
import { AVAILABLE_ENDPOINTS } from "@/shared/config";
import type { UserCreateDto, User, UserUpdateDto } from "@/shared/types";
import { makeAutoObservable, observable, runInAction } from "mobx";

type StoreActionResult = {
  success: boolean;
  error?: string;
};

class UsersStore {
  users: User[] = [];
  error: string | undefined;
  isLoading: boolean = false;
  selectedUser: User | undefined;

  constructor() {
    makeAutoObservable(this, {
      selectedUser: observable,
    });
  }

  private startLoading = () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = undefined;
    });
  };

  private stopLoading = () => {
    runInAction(() => {
      this.isLoading = false;
    });
  };

  private handleError = (e: unknown): string => {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    runInAction(() => {
      this.error = message;
    });
    return message;
  };

  public getUsers = async (): Promise<StoreActionResult> => {
    this.startLoading();
    try {
      const data = await api.get<User[]>(AVAILABLE_ENDPOINTS.users.list);
      runInAction(() => {
        this.users = data;
      });
      return { success: true };
    } catch (e) {
      const error = this.handleError(e);
      return { success: false, error };
    } finally {
      this.stopLoading();
    }
  };

  public getUser = async (
    id: string
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    this.startLoading();
    try {
      const user = await api.get<User>(AVAILABLE_ENDPOINTS.users.getById(id));
      return { success: true, user };
    } catch (e) {
      const error = this.handleError(e);
      return { success: false, error };
    } finally {
      this.stopLoading();
    }
  };

  public addUser = async (user: UserCreateDto): Promise<StoreActionResult> => {
    this.startLoading();
    let result: StoreActionResult = { success: false };
    try {
      await api.post(AVAILABLE_ENDPOINTS.users.create, user);
      result = { success: true };
    } catch (e) {
      const error = this.handleError(e);
      result = { success: false, error };
    } finally {
      await this.getUsers();
      this.stopLoading();
      return result;
    }
  };

  public updateUser = async (
    id: string,
    user: UserUpdateDto
  ): Promise<StoreActionResult> => {
    this.startLoading();
    let result: StoreActionResult = { success: false };
    try {
      await api.patch(AVAILABLE_ENDPOINTS.users.update(id), user);
      result = { success: true };
    } catch (e) {
      const error = this.handleError(e);
      result = { success: false, error };
    } finally {
      await this.getUsers();
      this.stopLoading();
      return result;
    }
  };

  public deleteUser = async (id: string): Promise<StoreActionResult> => {
    this.startLoading();
    let result: StoreActionResult = { success: false };
    try {
      await api.delete(AVAILABLE_ENDPOINTS.users.delete(id));
      result = { success: true };
    } catch (e) {
      const error = this.handleError(e);
      result = { success: false, error };
    } finally {
      await this.getUsers();
      this.stopLoading();
      return result;
    }
  };

  public setSelectedUser = (user: User | undefined) => {
    console.log("berdo", this.selectedUser);
    this.selectedUser = user;
    console.log("set selected");
    console.log(" voro", this.selectedUser?.name);
  };
}

export const usersStore = new UsersStore();
