import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    },
});

export const { setUser } = userSlice.actions

export const loginUser = (cridentials) => {
    return async dispatch => {
        dispatch(setUser(cridentials))
    }
}

export default userSlice.reducer