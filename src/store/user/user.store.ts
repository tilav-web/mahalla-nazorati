import type { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";

interface UserState {
  user: IUser | null | undefined;
  loading: boolean;
  login: (user: IUser) => void;
  logout: () => void;
  handleLoading: (bool: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  loading: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  handleLoading: (bool) => set({ loading: bool }),
}));
