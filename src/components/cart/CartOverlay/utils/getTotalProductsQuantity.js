export const getTotalProductsQuantity = (products) => {
  return products.reduce((acc, curr) => {
    return curr.quantity + acc;
  }, 0);
};
