import type { AuthResponse, LoginCredentials } from "../types/auth.type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}))
        throw new Error(errorData.message || errorData.error || 'Failed to login. Please try again letter.');
    }

    return response.json();
}
