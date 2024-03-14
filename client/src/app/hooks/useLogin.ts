import { useAuthStore } from "../store/user";
import { useState } from "react";
import { showToast } from "../utils/ToastHelper";
import { fetchUsers } from "../api/auth";

export const useLogin = () => {
  const setLoggedUser = useAuthStore((state) => state.logIn);
  const [isLoading, setIsLoading] = useState(false);
  const logIn = async (email: String, password: String) => {
    try {
      setIsLoading(true);
      const response = await fetchUsers(email, password);
      if (response) {
        setLoggedUser(response);
        showToast("success", `Logged in successfully!`);
      }
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logIn,
    isLoading,
  };
};
