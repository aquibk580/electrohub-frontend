export function formatPrice(price: number): string {
  const priceStr = price.toFixed(0).toString();
  const len = priceStr.length;

  if (len <= 3) return priceStr;

  let formattedPrice = priceStr.slice(-3);

  let remainder = priceStr.slice(0, -3);
  while (remainder.length > 0) {
    formattedPrice = remainder.slice(-2) + "," + formattedPrice;
    remainder = remainder.slice(0, -2);
  }

  return formattedPrice;
}
