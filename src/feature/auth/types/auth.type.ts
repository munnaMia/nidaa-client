export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}