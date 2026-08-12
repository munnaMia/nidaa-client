import React, { createContext, useEffect, useState } from "react";
import type { LoginCredentials, RegisterCredentials, User } from "../types/auth.type";
import { loginUser } from "../api/loginApi";
import { registerUser } from "../api/registerApi";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credential: LoginCredentials) => Promise<void>;
    register: (credential: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("auth_user");
        const storedToken = localStorage.getItem("auth_token");

        if (storedUser && storedToken) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("auth_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        const response = await loginUser(credentials);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
        localStorage.setItem("auth_token", response.token);
    };

    const register = async (credentials: RegisterCredentials) => {
        const response = await registerUser(credentials);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
        localStorage.setItem("auth_token", response.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
