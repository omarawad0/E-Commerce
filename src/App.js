import React, { Component } from "react";
import Categories from "./components/Categories/Categories";
import HeaderBar from "./components/HeaderBar/HeaderBar";
class App extends Component {
  render() {
    return (
      <div>
        <header>
          <HeaderBar />
        </header>
        <main>
          <Categories />;
        </main>
      </div>
    );
  }
}

export default App;
