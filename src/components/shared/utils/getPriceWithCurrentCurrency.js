export const getPriceWithCurrentCurrency = (prices, currentCurrency) => {
  return prices
    .filter((price) => price.currency === currentCurrency)[0]
    .amount.toFixed(2);
};
