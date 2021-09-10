import React from "react";
import Logo from "../../Icons/Logo.svg";
import styles from "./HeaderBar.module.css";
import CurrencyDropDown from "../CurrencyDropDown/CurrencyDropDown";
import DetectClickOutside from "../shared/DetectClickOutside/DetectClickOutside";
import { NavLink } from "react-router-dom";
import CartOverlay from "../cart/CartOverlay/CartOverlay";
import CategoriesNames from "../shared/CategoriesNames/CategoriesNames";

class HeaderBar extends React.PureComponent {
  render() {
    return (
      <div className={styles.headerBarWrapper}>
        <div className={styles.navCategories}>
          <NavLink to="/all" activeClassName={styles.navLinks}>
            ALL
          </NavLink>
          <CategoriesNames>
            {(categoryName) => {
              return (
                <NavLink
                  key={categoryName}
                  to={`/${categoryName}`}
                  activeClassName={styles.navLinks}
                >
                  {`${categoryName}`.toUpperCase()}
                </NavLink>
              );
            }}
          </CategoriesNames>
        </div>
        <div className={styles.logo}>
          <img src={Logo} alt="Arrow with green background" />
        </div>
        <div className={styles.cartContainer}>
          <DetectClickOutside
            render={(state) => (
              <CurrencyDropDown
                currency={this.props.currency}
                onCurrencyClick={this.props.onCurrencyClick}
                detect={state}
              />
            )}
          />
          <div className={styles.cart}>
            <DetectClickOutside
              render={(state) => (
                <CartOverlay
                  detect={state}
                  products={this.props.products}
                  currency={this.props.currency}
                  handleAddProductQuantity={this.props.handleAddProductQuantity}
                  handleRemoveProductQuantity={
                    this.props.handleRemoveProductQuantity
                  }
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
