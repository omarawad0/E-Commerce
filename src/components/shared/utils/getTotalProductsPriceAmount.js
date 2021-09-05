export const getTotalProductsPriceAmount = (cartProducts, currentCurrency) => {
  const eachProductTotal = cartProducts.map((product) => {
    return (
      product.prices.filter((price) => price.currency === currentCurrency)[0]
        .amount * product.quantity
    );
  });

  const allProductsTotal = eachProductTotal.reduce((acc, productTotal) => {
    return acc + productTotal;
  }, 0);
  return allProductsTotal.toFixed(2);
};
