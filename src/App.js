import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: {
        currentCurrency: "USD",
        symbolCurrency: "$",
      },
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
            currency={this.state.currency}
            onCurrencyClick={this.setCurrency}
          />
        </header>
        <main>
          <ProductList categoryName="tech" currency={this.state.currency} />;
        </main>
      </div>
    );
  }
}

export default App;
