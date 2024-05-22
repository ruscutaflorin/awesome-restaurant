import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type User = {
  id: number | null;
  restaurantId: number | null;
  restaurants: [{ id: number }] | null;
  name: string;
  email: string;
  profilePic: string | null;
};

type AuthStore = {
  user: User;
  token: string;
};

type AuthActions = {
  logIn: (data: AuthStore) => Promise<void>;
  logOut: () => Promise<void>;
};

type MyPersist = (
  config: StateCreator<AuthStore & AuthActions>,
  options: PersistOptions<AuthStore & AuthActions>
) => StateCreator<AuthStore & AuthActions>;

export const useAuthStore = create<AuthStore & AuthActions>(
  (persist as MyPersist)(
    (set) => ({
      user: {
        id: null,
        restaurantId: null,
        restaurants: null,
        name: "",
        email: "",
        profilePic: null,
      },
      token: "",
      logIn: async (data: AuthStore) => {
        set({ user: data.user, token: data.token });
      },
      logOut: async () => {
        set({
          user: {
            id: null,
            restaurantId: null,
            restaurants: null,
            name: "",
            email: "",
            profilePic: null,
          },
          token: "",
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
