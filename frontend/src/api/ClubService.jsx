import {GET_CLUBS, GET_CLUB_BY_LEAGUE, GET_CLUB} from '../routes'


const ClubService = {

    getClubs: async() => {
        const response = await fetch(GET_CLUBS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },

    getClubByLeague: async(league) => {
        const response = await fetch(GET_CLUB_BY_LEAGUE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },

    getClub: async(id) => {
        const response = await fetch(GET_CLUB, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },
    
}