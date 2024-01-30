import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { notification_message: null },
    reducers: {
        showNotification(state, action) {
            state.notification_message = action.payload
        },
        clearNotification(state) {
            state.notification_message = null
        }
    }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content) => (dispatch) => {
    dispatch(showNotification(content))
    setTimeout(() => {
        dispatch(clearNotification())
    }, 5000)
}

export default notificationSlice.reducer
