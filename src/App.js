import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
class App extends Component {
  render() {
    return (
      <div>
        <header>
          <HeaderBar />
        </header>
        <main>
          <ProductList categoryName="tech" currentCurrency="USD" />;
        </main>
      </div>
    );
  }
}

export default App;
