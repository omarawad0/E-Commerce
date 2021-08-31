import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/cart/CartPage/CartPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: {
        currentCurrency: "USD",
        symbolCurrency: "$",
      },
      cart: [],

      categories: this.props.categories,
    };
  }
  setCurrency = (clickedCurrency) => {
    this.setState({
      currency: {
        currentCurrency: clickedCurrency,
        symbolCurrency: getCurrencySymbol(clickedCurrency),
      },
    });
  };

  setCart = (addedToCart) => {
    this.setState({
      cart: [...this.state.cart, addedToCart],
    });
  };

  handleAddProductQuantity = (productId) => {
    const addedProduct = this.state.cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    this.setState({
      cart: addedProduct,
    });
  };

  handleRemoveProductQuantity = ({ id, quantity }) => {
    const decreasedProduct = this.state.cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    const removedProduct = this.state.cart.filter(
      (product) => product.id !== id
    );

    this.setState({
      cart: quantity === 1 ? removedProduct : decreasedProduct,
    });
  };

  getTotalProductsPriceAmount = () => {
    const eachProductTotal = this.state.cart.map((product) => {
      return (
        product.prices.filter(
          (price) => price.currency === this.state.currency.currentCurrency
        )[0].amount * product.quantity
      );
    });

    const allProductsTotal = eachProductTotal.reduce((acc, productTotal) => {
      return acc + productTotal;
    }, 0);
    return allProductsTotal;
  };

  render() {
    return (
      <div>
        <header>
          <HeaderBar
            categories={this.state.categories}
            products={this.state.cart}
            currency={this.state.currency}
            handleAddProductQuantity={this.handleAddProductQuantity}
            handleRemoveProductQuantity={this.handleRemoveProductQuantity}
            onCurrencyClick={this.setCurrency}
            getTotalProductsPriceAmount={this.getTotalProductsPriceAmount}
          />
        </header>
        <main>
          <Switch>
            {this.state.categories.map((category) => {
              return (
                <Route
                  key={category.name}
                  path={`/${category.name}`}
                  exact
                  render={() => (
                    <ProductList
                      categoryName={category.name}
                      products={category.products}
                      currency={this.state.currency}
                    />
                  )}
                />
              );
            })}
            {this.state.categories.map((category) => {
              return (
                <Route
                  key={category.name}
                  path={`/${category.name}/:productId`}
                  exact
                  render={({ match }) => (
                    <ProductPage
                      match={match}
                      currency={this.state.currency}
                      setToGlobalCart={this.setCart}
                      globalCart={this.state.cart}
                    />
                  )}
                />
              );
            })}
            <Route
              path={"/cart"}
              render={() => (
                <CartPage
                  products={this.state.cart}
                  currency={this.state.currency}
                  handleAddProductQuantity={this.handleAddProductQuantity}
                  handleRemoveProductQuantity={this.handleRemoveProductQuantity}
                />
              )}
            />
            <Route path="/" exact>
              <Redirect to="/tech" />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
