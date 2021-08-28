import React from "react";
import EmptyCart from "../../Icons/EmptyCart.svg";
import Logo from "../../Icons/Logo.svg";
import styles from "./HeaderBar.module.css";
import CurrencyDropDown from "../CurrencyDropDown/CurrencyDropDown";
import DetectClickOutside from "../shared/DetectClickOutside/DetectClickOutside";
import { NavLink } from "react-router-dom";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currency, onCurrencyClick, categories } = this.props;
    return (
      <>
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
            <img src={EmptyCart} alt="" />
          </div>
        </div>
      </>
    );
  }
}
export default HeaderBar;
