export function getCurrencySymbol(currency) {
  return currency === "GBP"
    ? "£"
    : currency === "JPY"
    ? "¥"
    : currency === "RUB"
    ? "₽"
    : currency === "AUD"
    ? "A$"
    : "$";
}
