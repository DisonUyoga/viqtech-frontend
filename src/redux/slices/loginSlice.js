import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:null,
  refresh:null,
  IsAuthenticated: false,
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    auth(state,action){
      const {token}=action.payload
      if(token){
        const {refresh, access}=token
        state.token=access
        state.refresh=refresh
        state.IsAuthenticated=true
      }
      
    }
  }
});

export const getToken=state=>state.login.token
export const getRefresh=state=>state.login.refresh
export const getAunthentication=state=>state.login.IsAuthenticated

export const {auth} = loginSlice.actions

export default loginSlice.reducer