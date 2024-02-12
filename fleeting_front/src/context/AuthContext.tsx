import { createContext, useState } from "react";
import { apiService, authenticatedLogin } from "../service/LoginService";
import { setCookie } from "nookies";
import Router from "next/router";

type SignInData = {
  email: string;
  password: string;
};

type User = {
  email: string;
};

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  // useEffect(() => {
  //   const { "fleeting-token": token } = parseCookies();
  //   console.log("user hahaha" + user);

  //   if (token) {
  //     userFindEmail(user).then((response) => setUser(response.email));
  //   }
  // }, []);

  async function signIn({ email, password }: SignInData) {
    const { token_acess, email: user } = await authenticatedLogin({
      email,
      password,
    });

    setCookie(undefined, "fleeting-token", token_acess, {
      maxAge: 60 * 60 * 24, // 24h
    });

    apiService.defaults.headers["Authorization"] = `Bearer ${token_acess}`;
    setUser(user);

    await Router.push("/");
    Router.reload();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
