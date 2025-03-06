import { createSlice } from '@reduxjs/toolkit';

type TSort = {
    name: string,
    sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}

interface IState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sort : TSort
}

const initialState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }
    },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer