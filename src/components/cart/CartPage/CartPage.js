import React, { Component } from "react";
import styles from "./CartPage.module.css";
import CartProduct from "../CartProduct/CartProduct";
export class CartPage extends Component {
  renderProducts = () => {
    return this.props.products[0]
      ? this.props.products.map((product, index) => {
          return (
            <div key={`${product.id}${index}`}>
              <div className={styles.divider}></div>
              <CartProduct
                product={product}
                currency={this.props.currency}
                size="medium"
                quantityBtnSize="small"
                handleAddProductQuantity={this.props.handleAddProductQuantity}
                handleRemoveProductQuantity={
                  this.props.handleRemoveProductQuantity
                }
              />
            </div>
          );
        })
      : null;
  };
  render() {
    return (
      <div className={styles.cartPageWrapper}>
        <div className={styles.cartPageHeader}>
          <h1>CART</h1>
        </div>
        {this.renderProducts()}
      </div>
    );
  }
}

export default CartPage;
