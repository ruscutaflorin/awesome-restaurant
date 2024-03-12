import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuthStore } from "@/app/store/user";
import axios from "axios";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state);

  const logIn = async () => {
    try {
      const response = await axios
        .post("http://localhost:8000/api/auth/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          setUser.logIn(response.data);
          console.log("Logged in successfully!");
        });
    } catch (error) {
      console.error(error);
    }
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
          variant="contained"
          color="primary"
          fullWidth
          onClick={logIn}
          className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </Button>
        <p>{setUser.user.id}</p>
      </form>
    </Container>
  );
};

export default LoginPage;
