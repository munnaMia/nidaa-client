import type { AuthResponse, RegisterCredentials } from "../types/auth.type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Client side pre validation
    if (credentials.confirmPassword && credentials.confirmPassword != credentials.password) {
        throw new Error("Password do not match");
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: credentials.name,
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Failed to register. Please try again");
    }

    return response.json();
}
