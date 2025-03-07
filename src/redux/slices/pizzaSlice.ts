import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type TParams = {
    currentPage: number,
    category: string,
    sortBy: string,
    order: string,
    search: string
}

export const fetchPizzas = createAsyncThunk<IItems[], TParams>(
	"pizzas/fetchPizzasStatus",
	async (params) => {
		const { currentPage, category, sortBy, order, search } = params;
		const { data } = await axios.get<IItems[]>(
			`https://67af4195dffcd88a6786195f.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

interface IItems {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	size: number;
	type: string;
	count: number;
}

interface IState {
	items: IItems[];
	status: "loading" | "error" | "success";
}

const initialState: IState = {
	items: [],
	status: "loading",
};

export const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<IItems[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = "success";
		}),
			builder.addCase(fetchPizzas.rejected, (state) => {
				state.status = "error";
				state.items = [];
			}),
			builder.addCase(fetchPizzas.pending, (state) => {
				state.status = "loading";
				state.items = [];
			});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
