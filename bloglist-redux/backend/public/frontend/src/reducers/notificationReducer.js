import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    },
});

export const { setNotification } = notificationSlice.actions

export const newNotification = (notification) => {
    return async dispatch => {
        dispatch(setNotification(notification))
    }
}

export default notificationSlice.reducer