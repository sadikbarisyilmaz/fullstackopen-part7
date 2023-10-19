import axios from 'axios'
const baseUrl = "https://bloglist-app.vercel.app/api/users"
//use http://localhost:3003/api/ for cypress

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