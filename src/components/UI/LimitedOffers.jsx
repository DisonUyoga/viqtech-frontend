import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PriceFormat from "../Format";
import { priceFormating } from "../../utils/price";
import "./productOnOffer.css";

function LimitedOffers({ productOnOffer }) {
  return (
    <>
      <Container>
        <Row>
          <Col lg="6" md="12" className="count__down-col">
            <div className="clock__top-content">
              <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
              <Link to={`/shop/${productOnOffer?.id}`}>
                <h3 className="text-white fs-5 mb-3">
                  {productOnOffer?.productName}
                </h3>
              </Link>
              <div className="d-flex flex-column align-item-center justify-content-center">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <p className="text-decoration-line-through">
                    Initial Price:{" "}
                    {priceFormating(productOnOffer?.initialPrice)}
                  </p>
                  <p>
                    Current Price:
                    <PriceFormat price={productOnOffer?.price} />
                  </p>
                </div>
              </div>
            </div>
            {/* <Clock/> */}
            <motion.button
              whileTap={{ scale: 1.2 }}
              className="buy__btn store__btn"
            >
              <Link to="/shop">Visit Store</Link>
            </motion.button>
          </Col>
          {/* <Col lg="6" md="12" className="text-end counter__img">
            <img src={productOnOffer?.imgUrl} alt="" />
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default LimitedOffers;
