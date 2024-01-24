import "./App.css";
// import "./index.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";

import Layout from "./components/Layout/Layout";

import { getToken, auth } from "./redux/slices/loginSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, lazy, Suspense } from "react";
import { redirect } from "react-router-dom";

import "./components/Contact/index.scss";
import Spinner from "./components/Spinner";

const Signup = lazy(()=>import("./pages/Signup"))
const Cart= lazy(()=>import("./pages/Cart"))
const Shop =lazy(()=>import("./pages/Shop"))
const ProductDetails=lazy(()=>import("./pages/ProductDetails"))

const Checkout=lazy(()=>import("./pages/Checkout"))
const ProtectedRoute=lazy(()=>import("./routers/ProtectedRoute"))
const Contact=lazy(()=>import("./components/Contact"))


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="Shop" element={<Suspense fallback={<Spinner/>}>
        
        <Shop />
        </Suspense>
        } />
      <Route path="shop/:id" element={<Suspense fallback={<Spinner/>}>
        
        <ProductDetails />
        </Suspense>
        } />
      <Route
        path="checkout"
        element={<Suspense fallback={<Spinner/>}>

          
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        </Suspense>
        }
      />
      <Route path="login" action={loginAction} element={<Login />} />
      <Route path="signup" element={<Suspense fallback={<Spinner/>}>
        
        <Signup />
        </Suspense>
        } />
      <Route path="cart" element={<Suspense fallback={<Spinner/>}>
        
        <Cart />
        </Suspense>
        } />
      <Route path="contact" element={<Suspense fallback={<Spinner/>}>
        
        <Contact />
        </Suspense>
        } />
    </Route>
  )
);

function App() {
  const token = useSelector(getToken);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
