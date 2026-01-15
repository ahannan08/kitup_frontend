const BASE_URL = 'http://localhost:5000'

const AUTH_PATH = 'api/auth'
const USER_PATH = 'api/users'
const CLUB_PATH = 'api/clubs'
const CART_PATH = 'api/carts'
const JERSEY_PATH = 'api/jerseys'

// Auth Routes
export const LOGIN = `${BASE_URL}/${AUTH_PATH}/login`
export const REGISTER = `${BASE_URL}/${AUTH_PATH}/register`
export const FORGOT_PASSWORD = `${BASE_URL}/${AUTH_PATH}/forgot-password`
export const RESET_PASSWORD = `${BASE_URL}/${AUTH_PATH}/reset-password`
export const REFRESH_TOKEN = `${BASE_URL}/${AUTH_PATH}/refresh-token`
export const LOGOUT = `${BASE_URL}/${AUTH_PATH}/logout`
export const CHANGE_PASSWORD = `${BASE_URL}/${AUTH_PATH}/change-password`

// User Routes
export const PROFILE = `${BASE_URL}/${USER_PATH}/profile`
export const UPDATE_PROFILE = `${BASE_URL}/${USER_PATH}/update-profile`

// Club Routes
export const GET_CLUBS = `${BASE_URL}/${CLUB_PATH}/`
export const SEARCH_CLUBS = `${BASE_URL}/${CLUB_PATH}/search`
export const GET_CLUB_BY_LEAGUE = (league) => `${BASE_URL}/${CLUB_PATH}/league/${league}`
export const GET_CLUB = (id) => `${BASE_URL}/${CLUB_PATH}/${id}`

// Jersey Routes
export const GET_ALL_JERSEYS = `${BASE_URL}/${JERSEY_PATH}`
export const GET_JERSEY = (id) => `${BASE_URL}/${JERSEY_PATH}/${id}`
export const GET_CLUB_JERSEYS = (team) => `${BASE_URL}/${JERSEY_PATH}/team/${team}`

// Cart Routes
export const GET_CART = `${BASE_URL}/${CART_PATH}`
export const UPDATE_CART = `${BASE_URL}/${CART_PATH}/update`
export const ADD_CART = `${BASE_URL}/${CART_PATH}/add`
export const DELETE_FROM_CART = `${BASE_URL}/${CART_PATH}/delete`
export const GET_CARTS = `${BASE_URL}/${CART_PATH}/all`



