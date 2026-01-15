import {GET_CART, GET_CARTS, ADD_CART, DELETE_FROM_CART} from '../routes'


const CartService = {
    getCart: async(id) => {
        const response = await fetch(GET_CART, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },
    getCarts: async() => {
        const response = await fetch(GET_CARTS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    },
    addToCart: async(jerseyId) => {
        const response = await fetch(ADD_CART, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jerseyId)
        })
        return response
    },
    deleteFromCart: async(jerseyId) => {
        const response = await fetch(DELETE_FROM_CART, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jerseyId)
        })
        return response
    }
}

export default CartService