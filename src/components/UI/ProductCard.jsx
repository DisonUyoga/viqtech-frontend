import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "./image-style.css";
import { getAunthentication } from "../../redux/slices/loginSlice";
import PriceFormat from "../Format";

const ProductCard = ({ item, checkAuth }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAunthentication);
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success("product added successfully");
  };

  return (
    <Col lg="3" md="4" sm="12" className="product__card-column">
      <div className="product__image-card">
        <figure className="product__image">
          <Link to={`/shop/${item.id}`}>
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt={item.productName}
            />
          </Link>

          <div className="product__details">
            <span className="product__name">{item.productName}</span>
            <motion.span whileTap={{scale:1.2}}><i className="ri-add-line" onClick={addToCart}></i></motion.span>
            <PriceFormat price={item.price} />
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4">
            {isAuthenticated ? (
              <Link
                to={`/shop/${item.id}`}
                whileTap={{ scale: 1.1 }}
                className="btn btn-sm rounded-pill btn-primary"
              >
                view
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm rounded-pill btn-danger"
                onClick={() => toast.error("You must log in")}
              >
                view
              </Link>
            )}
          </div>
        </figure>
      </div>
    </Col>
  );
};

export default ProductCard;
