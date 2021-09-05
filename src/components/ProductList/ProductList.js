import React from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { Query } from "@apollo/client/react/components";
import { getCategoryProducts } from "../../GraphQL/queries";

class ProductList extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.categoryName}>
          <h1>
            {this.props.categoryName === "" ? "All" : this.props.categoryName}
          </h1>
        </div>
        <div className={styles.productList}>
          <Query
            query={getCategoryProducts}
            variables={{ title: this.props.categoryName }}
          >
            {({ loading, data }) => {
              if (loading) return "loading..";
              return data.category.products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    productId={product.id}
                    currency={this.props.currency}
                    setCart={this.props.setCart}
                    cart={this.props.cart}
                  />
                );
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default ProductList;
