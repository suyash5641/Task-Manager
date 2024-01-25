"use client";
import React, { SetStateAction, createContext, useContext } from "react";
import { IEmailPassword } from "./auth.types";

export interface IAuthContext {
  loginWithEmailPassword: (payload: IEmailPassword) => Promise<void>;
  createAccountWithEmailPassword: (payload: IEmailPassword) => Promise<void>;
  logOut: () => void;
}
const initialContext: IAuthContext = {
  loginWithEmailPassword: () => Promise.resolve(),
  createAccountWithEmailPassword: () => Promise.resolve(),
  logOut: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialContext);
export const useAuthContext = () => useContext(AuthContext);
