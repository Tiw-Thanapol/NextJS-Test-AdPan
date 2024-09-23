import { IProduct } from "@/app/admin/dashboard/page"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState : IProduct = {
    _id: "",
    imgSrc: "",
    filterKey: "",
    name: "",
    price: "",
    category: "",
    fileKey: "",
}

export const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{ 
        setProduct: (state, action: PayloadAction<IProduct>) => {
            return action.payload
        }
    }
})

export const {setProduct} = productSlice.actions
export default productSlice.reducer;