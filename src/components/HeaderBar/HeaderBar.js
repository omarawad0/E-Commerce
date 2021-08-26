import React from "react";
import EmptyCart from "../../Icons/EmptyCart.svg";
import Logo from "../../Icons/Logo.svg";
import ArrowDown from "../../Icons/ArrowDown.svg";
import styles from "./HeaderBar.module.css";
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
          <div>
            <span>$</span> <img src={ArrowDown} alt="" />
          </div>
          <div className={styles.cart}>
            <img src={EmptyCart} alt="" />
          </div>
        </div>
      </>
    );
  }
}
export default HeaderBar;
