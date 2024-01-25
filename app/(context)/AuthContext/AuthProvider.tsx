"use client";
import { useCallback, useMemo, PropsWithChildren } from "react";
import { AuthContext, IAuthContext } from "./AuthContext";
import { IEmailPassword } from "./auth.types";
import { signIn } from "next-auth/react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const createAccountWithEmailPassword = useCallback(
    async (payload: IEmailPassword) => {
      const { email, password } = payload;
      try {
        const payload = {
          email: email,
          password: password,
        };
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const res = await response.json();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const loginWithEmailPassword = useCallback(
    async (payload: IEmailPassword) => {
      const { email, password } = payload;
      try {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const logOut = useCallback(() => {}, []);

  const contextValue: IAuthContext = useMemo(
    () => ({
      createAccountWithEmailPassword,
      loginWithEmailPassword,
      logOut,
    }),
    [createAccountWithEmailPassword, logOut, loginWithEmailPassword]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
