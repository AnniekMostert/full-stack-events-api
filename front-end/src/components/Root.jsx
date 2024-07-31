import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

export const Root = ({user, handleLogin}) => {
  return (
    <Box>
      <Header user={user} handleLogin={handleLogin} />
      <Outlet />
    </Box>
  );
};
