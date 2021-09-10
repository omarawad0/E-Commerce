import React from "react";
import classnames from "classnames";
import styles from "./Product.module.css";
import ProductCard from "../../Icons/ProductCard.svg";
import { Link } from "react-router-dom";
import { getPriceWithCurrentCurrency } from "../shared/utils/getPriceWithCurrentCurrency";

class Product extends React.PureComponent {
  addProductToCartHandler = () => {
    const isAlreadyInCart = this.props.cart.find(
      (product) => product.id === this.props.product.id
    );
    if (isAlreadyInCart) {
      alert("This Product Is Already In The Cart");
    } else {
      this.props.setCart({
        ...this.props.product,
        gallery: this.props.product.gallery,
        quantity: 1,
      });
    }
  };

  renderOutOfStockLabel = (inStock) => {
    return (
      !inStock && (
        <div className={styles.notInStock}>
          <span>OUT OF STOCK</span>
        </div>
      )
    );
  };

  renderProductCard = () => {
    const { attributes, id, inStock, category } = this.props.product;
    return attributes[0] ? (
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
    );
  };
  render() {
    const { name, gallery, id, prices, inStock, category } = this.props.product;
    return (
      <div className={styles.productWrapper}>
        <Link to={`/${category}/${id}`}>
          {this.renderOutOfStockLabel(inStock)}
          <div
            className={classnames(styles.product, {
              [styles.notInStockBox]: !inStock,
            })}
          >
            <img className={styles.productImage} src={gallery[0]} alt={name} />
            <p className={styles.name}>{name}</p>

            <p className={styles.price}>
              {`${
                this.props.currency.symbolCurrency
              }${getPriceWithCurrentCurrency(
                prices,
                this.props.currency.currentCurrency
              )}`}
            </p>
          </div>
        </Link>
        <div className={styles.productCard}>{this.renderProductCard()}</div>
      </div>
    );
  }
}

export default Product;
