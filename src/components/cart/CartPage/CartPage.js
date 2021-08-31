import React, { Component } from "react";
import styles from "./CartPage.module.css";
import CartProduct from "../CartProduct/CartProduct";
export class CartPage extends Component {
  render() {
    const {
      products,
      currency,
      handleRemoveProductQuantity,
      handleAddProductQuantity,
    } = this.props;
    return (
      <div className={styles.cartPageWrapper}>
        <div className={styles.cartPageHeader}>
          <h1>CART</h1>
        </div>
        {products[0]
          ? products.map((product, index) => {
              return (
                <div key={`${product.id}${index}`}>
                  <div className={styles.divider}></div>
                  <CartProduct
                    product={product}
                    currency={currency}
                    size="medium"
                    quantityBtnSize="small"
                    handleAddProductQuantity={handleAddProductQuantity}
                    handleRemoveProductQuantity={handleRemoveProductQuantity}
                  />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default CartPage;
