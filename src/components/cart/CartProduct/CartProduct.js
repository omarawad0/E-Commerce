import React, { Component } from "react";
import Button from "../../shared/Button/Button";
import Circle from "../../shared/Circle/Circle";
import styles from "./CartProduct.module.css";
import Plus from "../../../Icons/Plus.svg";
import Minus from "../../../Icons/Minus.svg";
import classnames from "classnames";
class CartProduct extends Component {
  render() {
    const {
      product: { brand, name, prices, attributes, id, image, quantity },
      currency: { currentCurrency, symbolCurrency },
      size,
      quantityBtnSize,
      handleRemoveProductQuantity,
      handleAddProductQuantity,
    } = this.props;

    const productImageClasses = classnames(styles.productImage, {
      [styles.ImageCartPage]: size === "medium",
      [styles.ImageCartMini]: size === "mini",
    });

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

          {prices
            .filter((price) => price.currency === currentCurrency)
            .map((currentPrice) => (
              <p key={currentPrice.currency} className={productPriceClasses}>
                {`${symbolCurrency}${currentPrice.amount * quantity}`}
              </p>
            ))}
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
        <div className={styles.productCount}>
          <div className={styles.AddOrRemoveQuantity}>
            <Button
              buttonType="button"
              variant="primary"
              isIcon
              size={quantityBtnSize}
              onClick={() => handleAddProductQuantity(id)}
            >
              {Plus}
            </Button>
            <p>{quantity}</p>
            <Button
              buttonType="button"
              variant="primary"
              isIcon
              size={quantityBtnSize}
              onClick={() => handleRemoveProductQuantity({ id, quantity })}
            >
              {Minus}
            </Button>
          </div>
          <img src={image} alt={name} className={productImageClasses} />
        </div>
      </div>
    );
  }
}

export default CartProduct;
