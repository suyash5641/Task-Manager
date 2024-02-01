"use client";
import { useCallback, useMemo, PropsWithChildren, useEffect } from "react";
import { AuthContext, IAuthContext } from "./AuthContext";
import { IEmailPassword } from "./auth.types";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session?.user) redirect("/home");
  //   else redirect("/");
  // }, [session?.user]);

  // console.log(session, "user");

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
        if (response?.ok) {
          router.push("/home");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [router]
  );

  const logOut = useCallback(() => {
    signOut();
  }, []);

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
