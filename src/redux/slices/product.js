import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios'

const URL="/api/products/"
const productAdaptor=createEntityAdapter()

const initialState=productAdaptor.getInitialState({
  status:"idle",
  error:null
})

export const fetchProducts=createAsyncThunk("products/fetchProducts", async()=>{
  try {

    const res=await axios.get(URL)
    return [...res.data]
    
  } catch (error) {
    return error.message
  }
})


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateReview(state,action){
      const {data, id}=action.payload
      state.entities[id].reviews.push(data)
      state.entities[id].total_rating=parseInt(state.entities[id].total_rating)+parseInt(data.rating)


    }
  },
  extraReducers(builder){
    builder
        .addCase(fetchProducts.pending, (state,action)=>{
          state.status="loading"
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
          state.status="success"
           productAdaptor.upsertMany(state,action.payload)
        })
        .addCase(fetchProducts.rejected, (state,action)=>{
          state.status="error"
          state.error=action.error.message
        })
  }
});
export const {
  selectAll,
  selectById,
  selectIds,
}= productAdaptor.getSelectors(state=>state.products)

export const getStatus=state=>state.products.status
export const getError=state=>state.products.error
export const {updateReview}=productSlice.actions
export default productSlice.reducer