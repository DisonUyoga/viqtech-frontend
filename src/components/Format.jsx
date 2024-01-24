import { priceFormating } from "../utils/price";

export default function PriceFormat({ price }) {
  return (
    <>
      <span className="product__price-card">{priceFormating(price)}</span>
    </>
  );
}
