import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";

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
  render() {
    console.log(this.state.cart);
    return (
      <div>
        <header>
          <HeaderBar
            categories={this.state.categories}
            currency={this.state.currency}
            onCurrencyClick={this.setCurrency}
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
                      setGlobalCart={this.setCart}
                    />
                  )}
                />
              );
            })}

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
