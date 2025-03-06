import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IItems {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	size: number;
	type: string;
	count: number;
}
[];

interface IState {
	totalPrice: number;
	items: IItems[];
}

const initialState: IState = {
	totalPrice: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<IItems>) => {
			const findItems = state.items.find(
				(item) => item.id === action.payload.id
			);

			if (findItems) {
				findItems.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce(
				(acc, item) => acc + item.price * item.count,
				0
			);
		},
		minusItem: (state, action: PayloadAction<number>) => {
			const findItems = state.items.find((item) => item.id === action.payload);

			if (findItems) {
				findItems.count--;
			}
		},
		removeItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id === action.payload);
			console.log(action.payload);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
