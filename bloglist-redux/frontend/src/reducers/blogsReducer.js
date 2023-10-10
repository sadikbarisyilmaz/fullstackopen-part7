import { getAll } from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        like(state, action) {
            const likedBlog = action.payload
            return state.map(blog =>
                blog.id !== likedBlog.id ? blog : likedBlog
            )
        },
        comment(state, action) {
            console.log(action);
            const commentedBlog = action.payload
            return state.map(blog =>
                blog.id !== commentedBlog.id ? blog : commentedBlog
            )
        },
        deleteBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        },
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            return state.concat(action.payload)
        }
    },
});

export const { setBlogs, like, deleteBlog, appendBlog, comment } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        dispatch(appendBlog(blog))
    }
}

export const removeBlogs = (blog) => {
    return async dispatch => {
        dispatch(deleteBlog(blog))
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        dispatch(like(blog))
    }
}

export const commentBlog = (blog) => {
    console.log(blog);

    return async dispatch => {
        dispatch(comment(blog))
    }
}


export default blogSlice.reducer