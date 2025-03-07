import { IItems } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: IItems[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}