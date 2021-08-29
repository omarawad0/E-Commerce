import React from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { Link } from "react-router-dom";

class ProductList extends React.Component {
  render() {
    const { categoryName, currency, products } = this.props;
    return (
      <div>
        <div className={styles.categoryName}>
          <h1>{categoryName}</h1>
        </div>
        <div className={styles.productList}>
          {products.map((product) => {
            return (
              <Link key={product.id} to={`/${product.category}/${product.id}`}>
                <Product
                  key={product.id}
                  product={product}
                  currency={currency}
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ProductList;
