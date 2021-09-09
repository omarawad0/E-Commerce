import React from "react";
import EmptyCart from "../../../Icons/EmptyCart.svg";
import styles from "./CartOverlay.module.css";
import CartProduct from "../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import Circle from "../../shared/Circle/Circle";
import { getTotalProductsPriceAmount } from "../../shared/utils/getTotalProductsPriceAmount";
import { getTotalProductsQuantity } from "./utils/getTotalProductsQuantity";
class CartOverlay extends React.PureComponent {
  componentDidUpdate() {
    this.props.detect.showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  renderMenuProducts = () => {
    return this.props.products[0]
      ? this.props.products.map((product, index) => {
          return (
            <div key={`${product.id}${index}`}>
              <div className={styles.divider}></div>
              <CartProduct
                product={product}
                currency={this.props.currency}
                size="mini"
                quantityBtnSize="mini"
                handleAddProductQuantity={this.props.handleAddProductQuantity}
                handleRemoveProductQuantity={
                  this.props.handleRemoveProductQuantity
                }
              />
            </div>
          );
        })
      : null;
  };

  renderMenu = () => {
    const {
      currency,
      products,
      detect: { nodeRef, showMenu, setShowMenu },
    } = this.props;

    return (
      showMenu && (
        <>
          <div className={styles.layer}></div>
          <div role="menu" className={styles.dropDownMenu} ref={nodeRef}>
            <div className={styles.cartOverlayHeader}>
              <p>
                My Bag, <span>{getTotalProductsQuantity(products)} items</span>
              </p>
            </div>
            <div className={styles.cartOverlayProducts}>
              {this.renderMenuProducts()}
            </div>
            <div className={styles.cartOverlayTotalPrice}>
              <p>Total</p>
              <p>{`${currency.symbolCurrency}${getTotalProductsPriceAmount(
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
      )
    );
  };

  render() {
    return (
      <div className={styles.dropDownContainer}>
        <div
          role="button"
          aria-pressed={false}
          tabIndex={0}
          aria-hidden
          className={styles.dropDownTriggerer}
          ref={this.props.detect.triggerRef}
        >
          <img src={EmptyCart} alt="empty cart logo" />
          <div className={styles.totalQuantityBadge}>
            <Circle color="#1D1F22" size="mini">
              {getTotalProductsQuantity(this.props.products)}
            </Circle>
          </div>
        </div>
        {this.renderMenu()}
      </div>
    );
  }
}

export default CartOverlay;
