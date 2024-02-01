"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { AuthProvider } from "../(context)/AuthContext/AuthProvider";

interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default Providers;
