import axios from 'axios'
const baseUrl = "http://localhost:3003/api/users"

export const getUsers = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
        return error.response
    }

}