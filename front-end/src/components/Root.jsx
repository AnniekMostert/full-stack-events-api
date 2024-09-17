import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

export const Root = ({user, onLogin}) => {
  return (
    <Box>
      <Header user={user} onLogin={onLogin} />
      <Outlet />
    </Box>
  );
};
