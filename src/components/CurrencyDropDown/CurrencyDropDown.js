import React from "react";
import styles from "./CurrencyDropDown.module.css";
import ArrowDown from "../../Icons/ArrowDown.svg";
import ArrowUp from "../../Icons/ArrowUp.svg";
import { getCurrencies } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class CurrencyDropDown extends React.PureComponent {
  renderCurrencies = (data) => {
    const {
      onCurrencyClick,
      detect: { setShowMenu },
    } = this.props;
    return data.currencies.map((currency) => {
      return (
        <button
          className={styles.dropDownMenuItem}
          role="menuitem"
          type="button"
          key={currency}
          id={currency}
          onClick={(e) => {
            onCurrencyClick(e.currentTarget.id);
            setShowMenu();
          }}
        >
          {currency}
        </button>
      );
    });
  };

  renderMenu = () => {
    return (
      <div
        role="menu"
        className={styles.dropDownMenu}
        ref={this.props.detect.nodeRef}
      >
        <Query query={getCurrencies}>
          {({ loading, data }) => {
            if (loading) return "loading..";
            return this.renderCurrencies(data);
          }}
        </Query>
      </div>
    );
  };

  setArrowIcon = () => {
    return this.props.detect.showMenu ? ArrowUp : ArrowDown;
  };

  render() {
    const {
      currency: { symbolCurrency },
      detect: { triggerRef, showMenu },
    } = this.props;
    return (
      <div className={styles.dropDownContainer}>
        <div
          role="button"
          aria-pressed={false}
          tabIndex={0}
          aria-hidden
          className={styles.dropDownTriggerer}
          ref={triggerRef}
        >
          <span>{symbolCurrency}</span>{" "}
          <img src={this.setArrowIcon()} alt="DropDown Arrow" />
        </div>
        {showMenu && this.renderMenu()}
      </div>
    );
  }
}

export default CurrencyDropDown;
