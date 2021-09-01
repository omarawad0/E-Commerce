import React, { Component } from "react";
import styles from "./CurrencyDropDown.module.css";
import ArrowDown from "../../Icons/ArrowDown.svg";
import ArrowUp from "../../Icons/ArrowUp.svg";
import { getCurrencies } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";

class CurrencyDropDown extends Component {
  render() {
    const {
      currency: { symbolCurrency },
      onCurrencyClick,
      detect: { nodeRef, triggerRef, showMenu, setShowMenu },
    } = this.props;
    const arrowIcon = showMenu ? ArrowUp : ArrowDown;
    return (
      <div className={styles.dropDownContainer}>
        <div
          role="button"
          aria-pressed={false}
          tabIndex={0}
          aria-hidden
          style={{ cursor: "pointer" }}
          className={styles.dropDownTriggerer}
          ref={triggerRef}
        >
          <span>{symbolCurrency}</span>{" "}
          <img src={arrowIcon} alt="DropDown Arrow" />
        </div>
        {showMenu && (
          <div role="menu" className={styles.dropDownMenu} ref={nodeRef}>
            <Query query={getCurrencies}>
              {({ loading, data }) => {
                if (loading) return "loading..";
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
              }}
            </Query>
          </div>
        )}
      </div>
    );
  }
}

export default CurrencyDropDown;
