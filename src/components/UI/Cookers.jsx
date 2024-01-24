import { Col } from "reactstrap";
import ProductsList from "./ProductsList";
export default function Cookers({ cooker }) {
  return (
    <>
      <Col lg="12" className="text-center mb-5">
        <h2 className="section__title" id="cooker">
          Cookers
        </h2>
      </Col>
      <ProductsList data={cooker} />
    </>
  );
}
