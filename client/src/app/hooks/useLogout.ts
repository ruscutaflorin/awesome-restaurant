import { useAuthStore } from "../store/user";
import { showToast } from "../../lib/utils/ToastHelper";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logOut);
  const logOut = async () => {
    const localStorageAuth = localStorage.getItem("auth-storage");

    if (localStorageAuth && JSON.parse(localStorageAuth).state.token) {
      await logout();
      showToast("success", `Logged out successfully!`);
    } else {
      showToast("warning", `You are not logged in!`);
    }
  };
  return {
    logOut,
  };
};
