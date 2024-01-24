import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import Services from "../services/Services";
import "../styles/home.css";
// import products from '../assets/data/products'
import { useDispatch, useSelector } from "react-redux";
import counterImg from "../assets/images/counter-timer-img.png";
import Spinner from "../components/Spinner";
import Trending from "../components/Trending";
import Television from "../components/UI/Television";
import Gaming from "../components/UI/Gaming";
import {
  fetchProducts,
  getError,
  getStatus,
  selectAll,
} from "../redux/slices/product";
import Cookers from "../components/UI/Cookers";
import SoundBarAndAudio from "../components/UI/SoundBarAndAudio";
import Fridge from "../components/UI/Fridge";
import LimitedOffers from "../components/UI/LimitedOffers";

const Home = () => {
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const products = useSelector(selectAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("hhh", products);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    <Spinner />;
  } else if (status === "error") {
    <h3 className="text-center">{error}</h3>;
  }

  const year = new Date().getFullYear();
  const [productOnOffer, setProductOnOffer] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [televisionProducts, setTelevisionProducts] = useState([]);
  const [cookerProducts, setCookerProducts] = useState([]);
  const [soundProducts, setSoundProducts] = useState([]);
  const [fridgeProducts, setFridgeProducts] = useState([]);
  const [gamingProducts, setGamingProducts] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      const filteredTrendingProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "trending"
      );
      const filteredBestSalesProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "television"
      );
      const filteredMobileProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "cooker"
      );
      const filteredWirelessProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "sound bar and audio"
      );
      const filteredPopularProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "fridge"
      );
      const filteredProductOnOffer = products.filter(
        (item) => item.category?.title.toLowerCase() === "offer"
      );

      const filteredGamingProducts = products.filter(
        (item) => item.category?.title.toLowerCase() === "gaming"
      );
      setProductOnOffer(filteredProductOnOffer[0]);
      setTrendingProducts(filteredTrendingProducts);
      setTelevisionProducts(filteredBestSalesProducts);
      setCookerProducts(filteredMobileProducts);
      setSoundProducts(filteredWirelessProducts);
      setFridgeProducts(filteredPopularProducts);
      setGamingProducts(filteredGamingProducts);
    }
  }, [products]);

  return (
    <>
      {" "}
      {products.length > 0 ? (
        <Helmet title={"Home"}>
          <section className="hero__section">
            <Container>
              <Trending products={products} year={year} />
            </Container>
          </section>
          <Services />
          <section className="trending__products">
            <Container>
              <Row className="d-flex flex-sm-column align-items-center justify-content-between gap-5">
                <Col lg="12" className="text-center">
                  <h2 className="section__title">Trending Products</h2>
                </Col>
                <ProductsList data={trendingProducts} />
              </Row>
            </Container>
          </section>
          {televisionProducts.length > 0 && (
            <section className="best__sales">
              <Television television={televisionProducts} />
            </section>
          )}
          {productOnOffer && (
            <section className="timer__count">
              <LimitedOffers productOnOffer={productOnOffer} />
            </section>
          )}
          <section className="new__arrivals">
            <Container>
              <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
                {cookerProducts.length > 0 && (
                  <Cookers cooker={cookerProducts} />
                )}
                {soundProducts.length > 0 && (
                  <SoundBarAndAudio soundItem={soundProducts} />
                )}
              </Row>
            </Container>
          </section>
          {fridgeProducts.length > 0 && (
            <section className="popular__category">
              <Fridge fridgeProducts={fridgeProducts} />
            </section>
          )}
          {gamingProducts.length > 0 && (
            <section className="popular__category">
              <Gaming gamingProducts={gamingProducts} />
            </section>
          )}
        </Helmet>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
