"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { TextField, Button, Stack, Box, Typography } from "@mui/material";
import { useAuthContext } from "@/app/(context)/AuthContext/AuthContext";

interface FormData {
  email: string;
  password: string;
}

const initialFormValues: FormData = {
  email: "",
  password: "",
};

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "55%",
  flexDirection: "column",
  display: "flex",
  height: "100vh",
  ".coverImage": {
    height: "100%",
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "45%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  opacity: "0.75",
  backgroundColor: "#1344c2",
  ".form": {
    border: "8px",
    width: "80%",
    height: "600px",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    padding: "0px 40px",
    gap: "24px",
    backgroundColor: "#fff",
    ".heading": {
      textAlign: "center",
    },
    ".footer": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export const GroupStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
}));

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormValues,
  });

  const [title, setTitle] = useState("Create an account");

  const { createAccountWithEmailPassword, loginWithEmailPassword } =
    useAuthContext();

  const handleNextButton: SubmitHandler<FormData> = useCallback(
    async (data: { email: string; password: string }) => {
      const formData = {
        email: data?.email,
        password: data?.password,
      };
      if (title === "Login") await loginWithEmailPassword(formData);
      else await createAccountWithEmailPassword(formData);
    },
    [createAccountWithEmailPassword, loginWithEmailPassword, title]
  );

  // const handleLoginSignUp = useCallback(() => {
  //   if (title === "Login") setTitle("Create an account");
  //   else if (title === "Create an account") setTitle("Login");
  // }, [title, setTitle]);

  const handleLoginSignUp = useCallback(() => {
    setTitle((prevTitle) =>
      prevTitle === "Login" ? "Create an account" : "Login"
    );
  }, [setTitle]);

  return (
    <GroupStack>
      <StyledBox>
        <Box
          component={"img"}
          className="coverImage"
          src={"/assets/background.jpg"}
        />
      </StyledBox>
      <StyledStack>
        <Stack className="form">
          <Typography className="heading">{title}</Typography>
          <TextField
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleNextButton)}
          >
            {title === "Create an account" ? "Sign Up" : "Login"}
          </Button>
          {title === "Create an account" ? (
            <Stack className="footer">
              <Typography>Already have an account? </Typography>
              <Button onClick={handleLoginSignUp}>Login</Button>
            </Stack>
          ) : (
            <Stack className="footer">
              <Typography>Create an account? </Typography>
              <Button onClick={handleLoginSignUp}>Sign Up</Button>
            </Stack>
          )}
        </Stack>
      </StyledStack>
    </GroupStack>
  );
};

export default Login;
