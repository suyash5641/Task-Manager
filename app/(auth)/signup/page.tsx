"use client";
import React, { useCallback, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { TextField, Button, Stack } from "@mui/material";
import { useAuthContext } from "@/app/(context)/AuthContext/AuthContext";

interface FormData {
  email: string;
  password: string;
}

const initialFormValues: FormData = {
  email: "",
  password: "",
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0 15px;
`;

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

  const { createAccountWithEmailPassword } = useAuthContext();

  // const handleFormSubmit = useCallback(async () => {
  //   const formData = {
  //     email: getValues("email"),
  //     password: getValues("password"),
  //   };
  //   await createAccountWithEmailPassword(formData);
  // }, [createAccountWithEmailPassword, getValues]);

  const handleNextButton: SubmitHandler<FormData> = useCallback(
    async (data: { email: string; password: string }) => {
      const formData = {
        email: data?.email,
        password: data?.password,
      };
      await createAccountWithEmailPassword(formData);
    },
    [createAccountWithEmailPassword]
  );

  // const disableButton = useMemo(() => {
  //   if (watch("email") === "" || watch("password") === "") return true;
  //   return false;
  // }, [watch]);

  // console.log(watch("email"), "oooo");

  return (
    <Stack>
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
        Login
      </Button>
    </Stack>
  );
};

export default Login;
