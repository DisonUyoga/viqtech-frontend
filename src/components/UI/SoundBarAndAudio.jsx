import ProductsList from "./ProductsList";
import { Col } from "reactstrap";
export default function SoundBarAndAudio({ soundItem }) {
  return (
    <>
      <Col lg="12" className="text-center mb-5">
        <h2 className="section__title" id="sound">
          Sound Bar and Audio
        </h2>
      </Col>
      <ProductsList data={soundItem} />
    </>
  );
}
