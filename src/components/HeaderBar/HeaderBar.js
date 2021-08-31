import React from "react";
import Logo from "../../Icons/Logo.svg";
import styles from "./HeaderBar.module.css";
import CurrencyDropDown from "../CurrencyDropDown/CurrencyDropDown";
import DetectClickOutside from "../shared/DetectClickOutside/DetectClickOutside";
import { NavLink } from "react-router-dom";
import CartOverlay from "../cart/CartOverlay/CartOverlay";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCurrencyClick,
      currency,
      products,
      handleRemoveProductQuantity,
      handleAddProductQuantity,
      categories,
      getTotalProductsPriceAmount,
    } = this.props;
    return (
      <div className={styles.headerBarWrapper}>
        <div className={styles.navCategories}>
          {categories.map((category) => {
            return (
              <NavLink
                key={category.name}
                to={`/${category.name}`}
                activeStyle={{
                  fontWeight: "600",
                  color: "#5ece7b",
                  borderBottom: "2px solid #5ece7b",
                }}
              >
                {`${category.name}`.toUpperCase()}
              </NavLink>
            );
          })}
        </div>
        <div className={styles.logo}>
          <img src={Logo} alt="Arrow with green background" />
        </div>
        <div className={styles.cartContainer}>
          <DetectClickOutside
            render={(state) => (
              <CurrencyDropDown
                currency={currency}
                onCurrencyClick={onCurrencyClick}
                detect={state}
              />
            )}
          />
          <div className={styles.cart}>
            <DetectClickOutside
              render={(state) => (
                <CartOverlay
                  detect={state}
                  products={products}
                  currency={currency}
                  handleAddProductQuantity={handleAddProductQuantity}
                  handleRemoveProductQuantity={handleRemoveProductQuantity}
                  getTotalProductsPriceAmount={getTotalProductsPriceAmount}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default HeaderBar;
