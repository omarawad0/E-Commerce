import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Product.module.css";

class Product extends Component {
  render() {
    const {
      product: { gallery, name, prices, inStock, id },
      currentCurrency,
    } = this.props;
    const price = prices.filter((price) => price.currency === currentCurrency);
    const currencySymbol =
      currentCurrency === "GBP"
        ? "£"
        : currentCurrency === "JPY"
        ? "¥"
        : currentCurrency === "RUB"
        ? "₽"
        : currentCurrency === "AUD"
        ? "A$"
        : "$";

    const productStyles = classnames(styles.product, {
      [styles.notInStockBox]: !inStock,
    });
    return (
      <div className={styles.productWrapper}>
        {!inStock && (
          <div className={styles.notInStock}>
            <span>OUT OF STOCK</span>
          </div>
        )}
        <div className={productStyles}>
          <a href={`# ${id}`}>
            <img
              width="100%"
              height="330px"
              style={{ objectFit: "cover" }}
              src={gallery[0]}
              alt={name}
            />
            <p className={styles.name}>{name}</p>
            <p
              className={styles.price}
            >{`${currencySymbol} ${price[0].amount}`}</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
