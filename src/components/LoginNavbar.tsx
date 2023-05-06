import {
  AppBar,
  Box,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { TbMoneybag, TbMoonFilled, TbSunFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { darkTheme, lightTheme } from "../utils/theme";

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
const LoginNavbar = ({ setTheme }: Props) => {
  const theme = useTheme();
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Link to={"/"}>
          <Stack direction={"row"}>
            <TbMoneybag color={theme.palette.primary.main} size={30} />
            <Typography variant="h6">LAV</Typography>
          </Stack>
        </Link>
        <Box flexGrow={1}></Box>
        <Box>
          {theme.palette.mode === "light" ? (
            <div
              role="button"
              onClick={() => setTheme(darkTheme)}
              aria-label="toggle-dark-mode"
            >
              <TbMoonFilled size={30} />
            </div>
          ) : (
            <div
              role="button"
              onClick={() => setTheme(lightTheme)}
              aria-label="toggle-light-mode"
            >
              <TbSunFilled size={30} />
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginNavbar;
