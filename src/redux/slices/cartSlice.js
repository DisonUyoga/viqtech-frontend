import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems:[],
  totalAmount:0,
  totalQuantity:0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state,action){
        const {id, productName, imgUrl, price}=action.payload
        const existingItem= state.cartItems.find(item=>item.id===id)
        state.totalQuantity++
        if(!existingItem){

          state.cartItems.push({
            id: id,
            productName: productName,
            imgUrl:imgUrl,
            price:price,
            quantity:1,
            totalPrice:price
          })
            
        }
        else{
            existingItem.quantity++
            existingItem.totalPrice= Number(existingItem.totalPrice)+ Number(price)
        }
        state.totalAmount= state.cartItems.reduce((total, item)=>total+Number(item.price)*Number(item.quantity),0)

    },
    deleteItem(state,action){
      const {id}=action.payload
      const existing= state.cartItems?.find(item=>item.id===id)
      if(existing){
        state.cartItems=state.cartItems?.filter(item=>item.id!==id)
        state.totalQuantity=state.totalQuantity-existing.quantity
        state.totalAmount= state?.cartItems?.reduce((total, item)=>total+Number(item.price)*Number(item.quantity),0)
      }
    }
  }
});


export const cartItems=state=>state.cart.cartItems
export const totalAmount=state=> state.cart.totalAmount
export const totalQuantity=state=>state.cart.totalQuantity
export const {addItem, deleteItem} = cartSlice.actions
export default cartSlice.reducer