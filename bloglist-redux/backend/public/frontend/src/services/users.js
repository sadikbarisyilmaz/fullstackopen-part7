import axios from 'axios'
const baseUrl = "https://bloglist-app.vercel.app/api/users"

export const getUsers = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (error) {
        return error.response
    }

}