import axios from "axios";

export const fetchUsers = async (email: String, password: String) => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login/", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};

/*  const logIn = async (email: String, password: String) => {
    try {
      setIsLoading(true);
      const response = await axios
        .post("http://localhost:8000/api/auth/login/", {
          email: email,
          password: password,
        })
        .then((response) => {
          setLoggedUser(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "email",
            JSON.stringify(response.data.user.email)
          );
          showToast("success", `Logged in successfully!`);
        });
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };
   */
