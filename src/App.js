import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/cart/CartPage/CartPage";
import CategoriesNames from "./components/shared/CategoriesNames/CategoriesNames";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: {
        currentCurrency: "USD",
        symbolCurrency: "$",
      },
      cart: [],
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

  render() {
    return (
      <div>
        <header>
          <HeaderBar
            products={this.state.cart}
            currency={this.state.currency}
            handleAddProductQuantity={this.handleAddProductQuantity}
            handleRemoveProductQuantity={this.handleRemoveProductQuantity}
            onCurrencyClick={this.setCurrency}
          />
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/all" />
            </Route>
            <Route
              path={`/all`}
              exact
              component={() => (
                <ProductList
                  categoryName=""
                  currency={this.state.currency}
                  setCart={this.setCart}
                  cart={this.state.cart}
                />
              )}
            />
            <CategoriesNames>
              {(categoryName) => {
                return (
                  <Route
                    key={categoryName}
                    path={`/${categoryName}`}
                    exact
                    component={() => (
                      <ProductList
                        categoryName={categoryName}
                        currency={this.state.currency}
                        setCart={this.setCart}
                        cart={this.state.cart}
                      />
                    )}
                  />
                );
              }}
            </CategoriesNames>
          </Switch>
          <CategoriesNames>
            {(categoryName) => {
              return (
                <Route
                  key={categoryName}
                  path={`/${categoryName}/:productId`}
                  exact
                  component={({ match }) => (
                    <ProductPage
                      match={match}
                      currency={this.state.currency}
                      setToGlobalCart={this.setCart}
                      globalCart={this.state.cart}
                    />
                  )}
                />
              );
            }}
          </CategoriesNames>
          <Route
            path={"/cart"}
            component={() => (
              <CartPage
                products={this.state.cart}
                currency={this.state.currency}
                handleAddProductQuantity={this.handleAddProductQuantity}
                handleRemoveProductQuantity={this.handleRemoveProductQuantity}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
