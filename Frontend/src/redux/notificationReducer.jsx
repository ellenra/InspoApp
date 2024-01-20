import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { goodNotification: null },
    reducers: {
        showNotification(state, action) {
            state.goodNotification = action.payload
        },
        clearNotification(state) {
            state.goodNotification = null
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
