import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

export const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export const createBlog = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const request = axios.post(baseUrl, data, config)
    const response = await request
    return response

  } catch (error) {
    return error.response
  }

}

export const deleteBlog = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const request = axios.delete(`${baseUrl}/${id}`, config)
    const response = await request
    return response

  } catch (error) {
    return error.response
  }

}

export const updateBlog = async (data, id) => {

  try {
    const request = axios.put(`${baseUrl}/${id}`, data)
    const response = await request
    return response

  } catch (error) {
    return error.response
  }

}
// export const updateBlog = async (data, token, id) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   }

//   try {
//     const request = axios.put(`${baseUrl}/${id}`, data, config)
//     const response = await request
//     return response

//   } catch (error) {
//     return error.response
//   }

// }

export const addComment = async (data, id) => {
  try {
    const request = axios.put(`${baseUrl}/${id}`, data)
    const response = await request
    return response

  } catch (error) {
    return error.response
  }

}