import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Product.module.css";
import ProductCard from "../../Icons/ProductCard.svg";
import { Link } from "react-router-dom";
class Product extends Component {
  addProductToCartHandler = () => {
    const isAlreadyInCart = this.props.cart.find(
      (product) => product.id === this.props.product.id
    );
    if (isAlreadyInCart) {
      alert("This Product Is Already In The Cart");
    } else {
      this.props.setCart({
        ...this.props.product,
        image: this.props.product.gallery[0],
        quantity: 1,
      });
    }
  };
  render() {
    const {
      product: { gallery, name, prices, inStock, id, category, attributes },
      currency: { currentCurrency, symbolCurrency },
    } = this.props;
    const price = prices.filter((price) => price.currency === currentCurrency);
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
        <Link to={`/${category}/${id}`}>
          <div className={productStyles}>
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
            >{`${symbolCurrency} ${price[0].amount}`}</p>
          </div>
        </Link>
        <div className={styles.productCard}>
          {attributes[0] ? (
            <Link to={`/${category}/${id}`}>
              <img src={ProductCard} alt="product cart" />
            </Link>
          ) : !inStock ? (
            <Link to={`/${category}/${id}`}>
              <img src={ProductCard} alt="product cart" />
            </Link>
          ) : (
            <img
              onClick={this.addProductToCartHandler}
              src={ProductCard}
              alt="product cart"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Product;
