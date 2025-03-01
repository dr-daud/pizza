import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items = action.payload.push(items)
        },
        removeItem(state, action) {
            state.items = action.payload.filter(item => item.id === action.payload.id)
        },
        clearItems(state) {
            state.items = []
        }
    }
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer