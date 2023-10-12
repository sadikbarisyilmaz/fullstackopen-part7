import axios from 'axios'
const baseUrl = "https://bloglist-app.vercel.app/login"

export const login = async credentials => {

    try {
        const response = await axios.post(baseUrl, credentials)
        return response
    } catch (error) {
        return error.response
    }

}
