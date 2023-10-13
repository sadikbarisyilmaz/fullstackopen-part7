import axios from 'axios'
const baseUrl = "https://bloglist-app.vercel.app/users"

export const getUsers = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
        return error.response
    }

}

export const newUser = async (data) => {
    try {
        const response = await axios.post(baseUrl, data)
        return response.data
    } catch (error) {
        return error.response
    }

}