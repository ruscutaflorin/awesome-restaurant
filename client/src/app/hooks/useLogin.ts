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

  const logIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetchUsers(email, password);

      if (response) {
        if (token === "") {
          const authData = {
            user: {
              id: response.id,
              name: response.name,
              email: response.email,
              profilePic: response.profilePic,
              createdAt: response.createdAt,
              updatedAt: response.updatedAt,
              restaurants: response.restaurants,
              restaurantId: response.restaurantId,
            },
            token: response.token,
          };
          await setLoggedUser(authData);
          push("/admin");
          showToast("success", `Logged in successfully!`);
        } else {
          showToast("warning", `Already logged in!`);
        }
      } else {
        showToast("error", `Email or Password combination mismatch!`);
      }
      return response.status;
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
