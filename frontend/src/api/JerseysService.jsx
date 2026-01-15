import {GET_JERSEYS, GET_JERSEY, GET_ALL_JERSEYS} from '../routes'


const JerseysService = {
    getAllJerseys: async() => {
        const response = await fetch(GET_ALL_JERSEYS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },
    getJersey: async(id) => {
        const response = await fetch(GET_JERSEY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
}