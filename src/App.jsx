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
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./components/Layout/Layout";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./routers/ProtectedRoute";
import { getToken, auth } from "./redux/slices/loginSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import Contact from "./components/Contact";
import "./components/Contact/index.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="Shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="login" action={loginAction} element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
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
