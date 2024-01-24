import {configureStore,combineReducers} from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import productSlice from './slices/product'
import loginSlice from './slices/loginSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const store = configureStore({
//     reducer:{
//         cart: cartSlice,
//         products:productSlice,
//         login:loginSlice,
//     }
// })

// export default store;

const rootReducer = combineReducers({
    cart: cartSlice,
        products:productSlice,
        login:loginSlice,
  });
  const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
  });
  
  export const persistor = persistStore(store);