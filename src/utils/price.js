export function priceFormating(price) {
  const p = parseInt(price);
  return p?.toLocaleString("en-KE", {
    style: "currency",
    currency: "Ksh",
  });
}
