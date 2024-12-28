import { createStore } from "zustand/vanilla";
import { User } from "@prisma/client";

export type OmittedUser = Omit<User, "password" | "id" | "updatedAt">;

export type UserState = {
  user: OmittedUser | undefined;
};

export type UserActions = {
  setUser: (user: OmittedUser) => void;
  updateUser: (partialUser: Partial<OmittedUser>) => void;
  deleteUser: () => void;
};

export type UserStore = UserState & UserActions;

export const createUserStore = () => {
  return createStore<UserStore>()((set) => ({
    user: undefined,
    setUser: (user) => set(() => ({ user })),
    deleteUser: () => set(() => ({ user: undefined })),
    updateUser: (partialUser) =>
      set((state) => ({
        user: { ...(state.user as OmittedUser), ...partialUser },
      })),
  }));
};
