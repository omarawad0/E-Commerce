import React from "react";
import EmptyCart from "../../Icons/EmptyCart.svg";
import Logo from "../../Icons/Logo.svg";
import styles from "./HeaderBar.module.css";
import CurrencyDropDown from "../CurrencyDropDown/CurrencyDropDown";
import DetectClickOutside from "../shared/DetectClickOutside/DetectClickOutside";
class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={styles.navCategories}>
          <a href="">CLOTHES</a>
          <a href="">TECH</a>
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
            <img src={EmptyCart} alt="" />
          </div>
        </div>
      </>
    );
  }
}
export default HeaderBar;
