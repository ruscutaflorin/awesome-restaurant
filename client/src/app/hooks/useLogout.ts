import { useAuthStore } from "../store/user";
import { showToast } from "../utils/ToastHelper";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logOut);
  const logOut = async () => {
    await logout();
    const localStorageToken = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");
    if (localStorageToken && localStorageUser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showToast("success", `Logged out successfully!`);
    } else {
      showToast("info", `You are not logged in!`);
    }
  };
  return {
    logOut,
  };
};
