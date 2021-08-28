import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: {
        currentCurrency: "USD",
        symbolCurrency: "$",
      },
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

  render() {
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
