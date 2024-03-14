import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
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
    <Container className="mx-auto mt-16 p-8 bg-gray-100 max-w-md rounded-lg">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <TextField
          id="outlined-start-adornment"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-start-adornment"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={isLoading}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
