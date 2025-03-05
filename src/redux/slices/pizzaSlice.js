import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get(`https://67af4195dffcd88a6786195f.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
    return data
})

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'success'
        }),
            builder.addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.items = []
            }),
            builder.addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.items = []
            })
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer