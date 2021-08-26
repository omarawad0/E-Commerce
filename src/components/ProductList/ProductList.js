import React from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import { LOAD_CATEGORIES } from "../../GraphQL/queries";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import { capitalizeFirstLetter } from "../../logic/capitalizeFirstLetter";
class ProductList extends React.Component {
  render() {
    const { categoryName, currentCurrency } = this.props;
    return (
      <Query query={LOAD_CATEGORIES}>
        {({ loading, data }) => {
          if (loading) return "loading..";
          console.log(data);
          const currentCategory = data.categories.filter(
            (category) => category.name === categoryName
          );
          return (
            <div>
              <div className={styles.categoryName}>
                <h1>{capitalizeFirstLetter(currentCategory[0].name)}</h1>
              </div>
              <div className={styles.productList}>
                {currentCategory[0].products.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      product={product}
                      currentCurrency={currentCurrency}
                    />
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default ProductList;
