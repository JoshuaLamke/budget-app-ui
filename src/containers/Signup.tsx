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

type SignupInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  signupUser: (data: SignupInputs) => void;
}

const Signup = ({ setTheme, signupUser }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupInputs>({
    resolver: zodResolver(
      z
        .object({
          username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters"),
          email: z.string().trim().email(),
          password: z
            .string()
            .trim()
            .min(8, "Password must be at least 8 characters long")
            .refine(
              (pswd) =>
                pswd !== pswd.toUpperCase() && pswd !== pswd.toLowerCase(),
              "Password must have at least one uppercase letter and one lowercase letter"
            )
            .refine(
              // eslint-disable-next-line
              (pswd) => pswd.match(/.*[!@#\$%\^&\*\?]+.*/gm),
              "Password must contain at least one special character (!@#$%^&*?)"
            ),
          confirmPassword: z.string().trim().min(1, "Must confirm password"),
        })
        .refine((data) => data.confirmPassword === data.password, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        })
    ),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const submitLoginInfo: SubmitHandler<SignupInputs> = (data) =>
    signupUser(data);

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
              Create Account
            </Typography>
            <form onSubmit={handleSubmit(submitLoginInfo)}>
              <Stack>
                <TextField
                  label="Username"
                  variant="outlined"
                  sx={{ marginBottom: "1em" }}
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "1em" }}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
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
                <TextField
                  onPaste={(e) => e.preventDefault()}
                  label="Confirm Password"
                  variant="outlined"
                  sx={{ marginBottom: "1em" }}
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
                  Sign Up
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ borderRadius: "1000em" }}
                  onClick={() => navigate("/")}
                >
                  Log In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Signup;
