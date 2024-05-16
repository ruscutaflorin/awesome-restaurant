import { useAuthStore } from "../store/user";
import { useState } from "react";
import { showToast } from "../../lib/utils/ToastHelper";
import { fetchUsers } from "../api/auth";
import { useRouter } from "next/navigation";
export const useLogin = () => {
  const setLoggedUser = useAuthStore((state) => state.logIn);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const { push } = useRouter();
  const logIn = async (email: String, password: String) => {
    try {
      setIsLoading(true);
      const response = await fetchUsers(email, password);
      console.log(response, "here");

      if (response) {
        if (token === "") {
          setLoggedUser(response);
          push("/restaurants");
          showToast("success", `Logged in successfully!`);
        } else {
          showToast("warning", `Already logged in!`);
        }
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
