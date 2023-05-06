import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoginNavbar from "../components/LoginNavbar";

type LoginInputs = {
  email: string;
  password: string;
};

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  loginUser: (data: LoginInputs) => void;
}

const Login = ({ setTheme, loginUser }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>({
    resolver: zodResolver(
      z.object({
        email: z.string().trim().email(),
        password: z.string().trim().min(1, "Must input password"),
      })
    ),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const submitLoginInfo: SubmitHandler<LoginInputs> = (data) => loginUser(data);

  return (
    <Box
      height={"100vh"}
      bgcolor={(theme) => theme.palette.background.default}
      display={"flex"}
      flexDirection={"column"}
    >
      <LoginNavbar setTheme={setTheme} />
      <Box
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Card
          sx={{
            width: {
              xs: "90%",
              sm: "70%",
              md: "50%",
              lg: "40%",
            },
          }}
        >
          <Stack p={3}>
            <Typography variant="h4" mb={2}>
              Login To LAV
            </Typography>
            <form onSubmit={handleSubmit(submitLoginInfo)}>
              <Stack>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "1em" }}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  sx={{ marginBottom: "1em" }}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        style={{ width: "2em" }}
                      >
                        {showPassword ? (
                          <AiFillEye size={20} data-testid="show-password" />
                        ) : (
                          <AiFillEyeInvisible
                            size={20}
                            data-testid="hide-password"
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ borderRadius: "1000em", marginBottom: "1em" }}
                  type="submit"
                >
                  Log In
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ borderRadius: "1000em" }}
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
