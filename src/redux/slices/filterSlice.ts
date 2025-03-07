import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSort = {
	name: string;
	sortProperty: string;
};

interface IState {
	categoryId: number;
	currentPage: number;
	searchValue: string;
	sort: TSort;
}

const initialState: IState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: "",
	sort: {
		name: "популярности",
		sortProperty: "rating",
	},
};

export const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSort: (state, action: PayloadAction<TSort>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<IState>) => {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
