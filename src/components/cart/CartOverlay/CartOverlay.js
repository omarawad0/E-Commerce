import React, { Component } from "react";
import EmptyCart from "../../../Icons/EmptyCart.svg";
import styles from "./CartOverlay.module.css";
import CartProduct from "../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import Circle from "../../shared/Circle/Circle";
import { getTotalProductsPriceAmount } from "../../shared/utils/getTotalProductsPriceAmount";
import { getTotalProductsQuantity } from "./utils/getTotalProductsQuantity";
class CartOverlay extends Component {
  componentDidUpdate() {
    this.props.detect.showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  render() {
    const {
      currency,
      detect: { nodeRef, triggerRef, showMenu, setShowMenu },
      products,
      handleRemoveProductQuantity,
      handleAddProductQuantity,
    } = this.props;

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
          <img src={EmptyCart} alt="empty cart logo" />
          <div className={styles.totalQuantityBadge}>
            <Circle color="#1D1F22" size="mini">
              {getTotalProductsQuantity(products)}
            </Circle>
          </div>
        </div>

        {showMenu && (
          <>
            <div className={styles.layer}></div>
            <div role="menu" className={styles.dropDownMenu} ref={nodeRef}>
              <div className={styles.cartOverlayHeader}>
                <p>
                  My Bag,{" "}
                  <span>{getTotalProductsQuantity(products)} items</span>
                </p>
              </div>
              <div className={styles.cartOverlayProducts}>
                {products[0]
                  ? products.map((product, index) => {
                      return (
                        <div key={`${product.id}${index}`}>
                          <div className={styles.divider}></div>
                          <CartProduct
                            product={product}
                            currency={currency}
                            size="mini"
                            quantityBtnSize="mini"
                            handleAddProductQuantity={handleAddProductQuantity}
                            handleRemoveProductQuantity={
                              handleRemoveProductQuantity
                            }
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className={styles.cartOverlayTotalPrice}>
                <p>Total</p>
                <p style={{ fontSize: "1.6rem", fontWeight: "700" }}>{`${
                  currency.symbolCurrency
                }${getTotalProductsPriceAmount(
                  products,
                  currency.currentCurrency
                )}`}</p>
              </div>

              <div className={styles.cartOverlayButtons}>
                <Link to="/cart" onClick={() => setShowMenu(false)}>
                  <Button
                    buttonType="button"
                    variant="primary"
                    isIcon={false}
                    size="large"
                  >
                    VIEW BAG
                  </Button>
                </Link>

                <Button
                  buttonType="button"
                  variant="secondary"
                  isIcon={false}
                  size="large"
                >
                  CHECK OUT
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CartOverlay;
