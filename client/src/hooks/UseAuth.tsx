import React, { createContext, useContext, useState, useEffect } from "react";
import { type UserType } from "@/shared/types";
import cookies from "js-cookie";

/**
 * Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const cacheKey = "sm-user";
/**
 * Authentication Provider
 * @name AuthProvider
 * @param props @type {React.ComponentProps}
 * @returns {React.ReactNode}
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for stored user data on app startup
    const storedUser = cookies.get(cacheKey);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        cookies.remove(cacheKey);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {}, [isAuthenticated]);
  const cache = (userData: UserType) => {
    console.log("logging user in");
    setUser(userData);
    cookies.set(cacheKey, JSON.stringify(userData), { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    cookies.remove(cacheKey);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        cache,
        logout,
        cacheKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  cache: (user: UserType) => void;
  cacheKey: string;
  logout: () => void;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
}
