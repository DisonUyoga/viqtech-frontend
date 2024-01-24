import { Col, Row, Container } from "reactstrap";
import ProductsList from "./ProductsList";

function Gaming({ gamingProducts }) {
  return (
    <div>
      {" "}
      <Container>
        <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
          <Col lg="12" className="text-center mb-5">
            <h2 className="section__title" id="gaming">
              Gaming
            </h2>
          </Col>
          <ProductsList data={gamingProducts} />
        </Row>
      </Container>
    </div>
  );
}

export default Gaming;
