import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Product.module.css";
import ProductCard from "../../Icons/ProductCard.svg";
import { Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { getProduct } from "../../GraphQL/queries";
class Product extends Component {
  addProductToCartHandler = (product) => {
    const isAlreadyInCart = this.props.cart.find(
      (product) => product.id === this.props.productId
    );
    if (isAlreadyInCart) {
      alert("This Product Is Already In The Cart");
    } else {
      this.props.setCart({
        ...product,
        image: product.gallery[0],
        quantity: 1,
      });
    }
  };
  render() {
    return (
      <Query query={getProduct} variables={{ id: this.props.productId }}>
        {({ loading, data }) => {
          if (loading) return "loading..";
          const { name, gallery, attributes, id, prices, inStock, category } =
            data.product;

          return (
            <div className={styles.productWrapper}>
              {!inStock && (
                <div className={styles.notInStock}>
                  <span>OUT OF STOCK</span>
                </div>
              )}
              <Link to={`/${category}/${id}`}>
                <div
                  className={classnames(styles.product, {
                    [styles.notInStockBox]: !inStock,
                  })}
                >
                  <img
                    width="100%"
                    height="330px"
                    style={{ objectFit: "cover" }}
                    src={gallery[0]}
                    alt={name}
                  />
                  <p className={styles.name}>{name}</p>
                  {prices
                    .filter(
                      (price) =>
                        price.currency === this.props.currency.currentCurrency
                    )
                    .map((currentPrice) => (
                      <p key={currentPrice.currency} className={styles.price}>
                        {`${this.props.currency.symbolCurrency}${currentPrice.amount}`}
                      </p>
                    ))}
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
                    onClick={() => this.addProductToCartHandler(data.product)}
                    src={ProductCard}
                    alt="product cart"
                  />
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Product;
