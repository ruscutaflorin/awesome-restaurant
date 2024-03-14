import { create } from "zustand";
type User = {
  id: number | null;
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

export const useAuthStore = create<AuthStore & AuthActions>((set) => ({
  user: {
    id: null,
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
      user: { id: null, name: "", email: "", profilePic: null },
      token: "",
    });
  },
}));
