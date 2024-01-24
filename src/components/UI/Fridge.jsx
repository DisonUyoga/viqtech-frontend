import { Container, Row, Col } from "reactstrap";
import ProductsList from "./ProductsList";

function Fridge({ fridgeProducts }) {
  return (
    <div>
      <Container>
        <Row className="d-flex flex-sm-column flex-md-row align-items-center justify-content-between gap-5">
          <Col lg="12" className="text-center mb-5">
            <h2 className="section__title" id="fridge">
              Fridge
            </h2>
          </Col>
          <ProductsList data={fridgeProducts} />
        </Row>
      </Container>
    </div>
  );
}

export default Fridge;
