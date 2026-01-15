import {LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD, REFRESH_TOKEN, LOGOUT, CHANGE_PASSWORD} from '../routes'


const AuthService = {

    login: async (email,password) =>{

        const response = await fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })

        if (response.data?.accessToken){
            localStorage.setItem("accessToken",response.data.accessToken)
        }
        if (response.data?.refreshToken){
            localStorage.setItem("refreshToken",response.data.refreshToken)

        }
        localStorage.setItem("user",JSON.stringify(response.data.user))
        return response

    },


    register:async(userData) =>{
        const response = await fetch(REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        return response
    },

    forgotPassword: async(email) => {
        const response = await fetch(FORGOT_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        return response
    },

    resetPassword: async(token,password) => {
        const response = await fetch(RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token,password})
        })
        return response
    },

    refreshToken: async(refreshToken) => {
        const response = await fetch(REFRESH_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(refreshToken)
        })
        return response
    },

    logout: async(refreshToken) => {
        const response = await fetch(LOGOUT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(refreshToken)
        })
        return response
    },

    changePassword: async(password) => {
        const response = await fetch(CHANGE_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        })
        return response
    }
}

export default AuthService