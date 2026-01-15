import {LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD, REFRESH_TOKEN, LOGOUT, CHANGE_PASSWORD} from '../routes'

const AuthService = {

    login: async (email, password) => {
        try {
            const response = await fetch(LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            // Parse JSON response
            const data = await response.json()

            // Check if response is OK before storing data
            if (response.ok && data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken)
            }
            if (response.ok && data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken)
            }
            if (response.ok && data.user) {
                localStorage.setItem("user", JSON.stringify(data.user))
            }

            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()
            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Register error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await fetch(FORGOT_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const data = await response.json()
            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Forgot password error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await fetch(RESET_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, password })
            })

            const data = await response.json()
            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Reset password error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    refreshToken: async (refreshToken) => {
        try {
            const response = await fetch(REFRESH_TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            })

            const data = await response.json()

            if (response.ok && data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken)
            }

            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Refresh token error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    logout: async (refreshToken) => {
        try {
            const response = await fetch(LOGOUT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            })

            const data = await response.json()

            // Clear local storage on successful logout
            if (response.ok) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                localStorage.removeItem("user")
            }

            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Logout error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    },

    changePassword: async (password) => {
        try {
            const response = await fetch(CHANGE_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            })

            const data = await response.json()
            return { success: response.ok, data, status: response.status }
        } catch (error) {
            console.error('Change password error:', error)
            return { success: false, error: error.message, status: 500 }
        }
    }
}

export default AuthService