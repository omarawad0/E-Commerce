import React from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";

class ProductList extends React.Component {
  render() {
    const { categoryName, currency, products, cart } = this.props;
    return (
      <div>
        <div className={styles.categoryName}>
          <h1>{categoryName}</h1>
        </div>
        <div className={styles.productList}>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                currency={currency}
                setCart={this.props.setCart}
                cart={cart}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default ProductList;
