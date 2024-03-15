import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/app/hooks/useLogin";
import { useLogout } from "@/app/hooks/useLogout";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, isLoading } = useLogin();
  const { logOut } = useLogout();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
     await logIn(username, password);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logOut();
  };

  return (
    <div className="mx-auto mt-16 p-8 bg-gray-100 max-w-md rounded-lg">
      <h4 className="text-center text-xl mb-4">Login</h4>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex p-4">
          <Button
            disabled={isLoading}
            color="primary"
            onClick={handleSubmit}
            className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mx-auto "
          >
            Login
          </Button>
          <Button
            color="secondary"
            onClick={handleLogout}
            className="focus:outline-none focus:ring focus:border-blue-300 mx-auto"
          >
            LogOut
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
