import axios from "axios";

const BACKEND_DOMAIN = "https://socialcircleapp.onrender.com"

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: BACKEND_DOMAIN,
});

// Axios interceptor to handle token expiration and refreshing
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the response status code indicates an expired token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Refresh the token
            const refreshToken = localStorage.getItem("refreshToken");

            try {
                const response = await api.post("/refresh-token", {
                    refreshToken,
                });

                // Update the stored tokens
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);

                // Update the Authorization header for subsequent requests
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

                // Retry the original request with the new token
                return api(originalRequest);
            } catch (error) {
                // Handle token refresh failure
                // You can redirect the user to the login page or perform other actions as needed
                console.log("Token refresh failed:", error);
            }
        }

        return Promise.reject(error);
    }
);

// Register user

const register = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(REGISTER_URL, userData, config)

    return response.data
}

// Login user

const login = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

// Logout

const logout = () => {
    return localStorage.removeItem("user")
}

// Activate user

const activate = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(ACTIVATE_URL, userData, config)

    return response.data
}

// Reset user password

const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_URL, userData, config)

    return response.data
}

const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)

    return response.data
}


const authService = { register, login, logout, activate, resetPassword, resetPasswordConfirm }

export default authService


