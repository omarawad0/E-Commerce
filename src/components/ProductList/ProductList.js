import React from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { capitalizeFirstLetter } from "../shared/utils/capitalizeFirstLetter";
class ProductList extends React.Component {
  render() {
    const { categoryName, currency, products } = this.props;
    return (
      <div>
        <div className={styles.categoryName}>
          <h1>{capitalizeFirstLetter(categoryName)}</h1>
        </div>
        <div className={styles.productList}>
          {products.map((product) => {
            return (
              <Product key={product.id} product={product} currency={currency} />
            );
          })}
        </div>
      </div>
    );
  }
}
export default ProductList;
