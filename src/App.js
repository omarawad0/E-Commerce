import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { getCurrencySymbol } from "./components/shared/utils/getCurrencySymbol";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/cart/CartPage/CartPage";
import CategoriesNames from "./components/shared/CategoriesNames/CategoriesNames";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
i18n
  .use(ChainedBackend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next",
        },
      },
    },
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
        {
          loadPath: "public/locales/{{lng}}/{{ns}}.json",
        },
      ],
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

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
              render={() => (
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
                    render={() => (
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
            }}
          </CategoriesNames>
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
        </main>
      </div>
    );
  }
}

export default App;
