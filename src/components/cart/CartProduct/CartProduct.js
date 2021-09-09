import React, { Component } from "react";
import Button from "../../shared/Button/Button";
import Circle from "../../shared/Circle/Circle";
import styles from "./CartProduct.module.css";
import classnames from "classnames";
import { getPriceWithCurrentCurrency } from "../../shared/utils/getPriceWithCurrentCurrency";
import CartProductActions from "./CartProductActions/CartProductActions";
class CartProduct extends Component {
  render() {
    const {
      product: { brand, name, prices, attributes, id, gallery, quantity },
      currency: { currentCurrency, symbolCurrency },
      size,
    } = this.props;

    const productBrandClasses = classnames({
      [styles.brandCartPage]: size === "medium",
      [styles.brandCartMini]: size === "mini",
    });

    const productNameClasses = classnames({
      [styles.nameCartPage]: size === "medium",
      [styles.nameCartMini]: size === "mini",
    });

    const productPriceClasses = classnames({
      [styles.priceCartPage]: size === "medium",
      [styles.priceCartMini]: size === "mini",
    });

    const attributeNameClasses = classnames({
      [styles.attributeNameCartPage]: size === "medium",
      [styles.attributeNameMini]: size === "mini",
    });
    return (
      <div className={styles.product}>
        <div className={styles.productInfo}>
          <div>
            <h1 className={productBrandClasses}>{brand}</h1>
            <h2 className={productNameClasses}>{name}</h2>
          </div>
          <p className={productPriceClasses}>
            {`${symbolCurrency}${getPriceWithCurrentCurrency(
              prices,
              currentCurrency
            )}`}
          </p>
          <div className={styles.productAttributes}>
            {attributes[0]
              ? attributes.map((attribute, index) => {
                  return (
                    <div
                      key={`${attribute.attributeId}${index}`}
                      className={styles.attribute}
                    >
                      <p
                        className={attributeNameClasses}
                      >{`${attribute.attributeName}:`}</p>
                      <div className={styles.item}>
                        {attribute.attributeType === "swatch" ? (
                          <Circle
                            color={attribute.selectedItem.value}
                            size={size}
                          />
                        ) : (
                          <Button
                            buttonType="button"
                            variant="primary"
                            isIcon={false}
                            size={size}
                            isSelected={true}
                            stylesProps={{
                              pointerEvents: "none",
                            }}
                          >
                            {attribute.selectedItem.value}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <CartProductActions
          handleRemoveProductQuantity={this.props.handleRemoveProductQuantity}
          handleAddProductQuantity={this.props.handleAddProductQuantity}
          quantityBtnSize={this.props.quantityBtnSize}
          name={name}
          size={size}
          quantity={quantity}
          gallery={gallery}
          id={id}
        />
      </div>
    );
  }
}

export default CartProduct;
