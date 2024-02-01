"use client";
import { Button } from "@mui/material";
import { useAuthContext } from "../(context)/AuthContext/AuthContext";

const Home = () => {
  const { logOut } = useAuthContext();
  return <Button onClick={logOut}>Logout</Button>;
};

export default Home;
