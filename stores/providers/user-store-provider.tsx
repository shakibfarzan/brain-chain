"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import { createUserStore, UserStore } from "@/stores/user-store";

type UserStoreApi = ReturnType<typeof createUserStore>;

const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export const UserStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<UserStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const counterStoreContext = useContext(UserStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
