import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "@mui/material";
import Login from "./containers/Login";
import { lightTheme } from "./utils/theme";
import Signup from "./containers/Signup";
import { loginUser, signupUser } from "./utils/queries";

const AppRoutes = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setTheme={setTheme} loginUser={loginUser} />,
    },
    {
      path: "/signup",
      element: <Signup setTheme={setTheme} signupUser={signupUser} />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default AppRoutes;
