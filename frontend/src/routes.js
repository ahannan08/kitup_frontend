BASE_URL = 'http://localhost:3000'


AUTH_PATH = 'api/auth'
USER_PATH = 'api/users'
CLUB_PATH = 'api/clubs'
CART_PATH = 'api/carts'
JERSEY_PATH = 'api/jerseys'

LOGIN = `${BASE_URL}/${AUTH_PATH}/login`
REGISTER = `${BASE_URL}/${AUTH_PATH}/register`
FORGOT_PASSWORD = `${BASE_URL}/${AUTH_PATH}/forgot-password`
RESET_PASSWORD = `${BASE_URL}/${AUTH_PATH}/reset-password/:${token}`
REFRESH_TOKEN = `${BASE_URL}/${AUTH_PATH}/refresh-token`
LOGOUT = `${BASE_URL}/${AUTH_PATH}/logout`
CHANGE_PASSWORD = `${BASE_URL}/${AUTH_PATH}/change-password`



PROFILE = `${BASE_URL}/${USER_PATH}/profile`
UPDATE_PROFILE = `${BASE_URL}/${USER_PATH}/update-profile`


GET_CLUBS = `${BASE_URL}/${CLUB_PATH}/`
SEARCH_CLUBS = `${BASE_URL}/${CLUB_PATH}/search`
GET_CLUB_BY_LEAGUE = `${BASE_URL}/${CLUB_PATH}/league/${league}`
GET_CLUB = `${BASE_URL}/${CLUB_PATH}/${id}`


GET_ALL_JERSEYS = `${BASE_URL}/${JERSEY_PATH}/`
GET_JERSEY = `${BASE_URL}/${JERSEY_PATH}/${id}`
GET_CLUB_JERSEYS = `${BASE_URL}/${JERSEY_PATH}/team/${team}`



GET_CART = `${BASE_URL}/${CART_PATH}/`
UPDATE_CART = `${BASE_URL}/${CART_PATH}/update`
ADD_CART = `${BASE_URL}/${CART_PATH}/add`



