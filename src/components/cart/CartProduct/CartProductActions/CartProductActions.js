import React from "react";
import styles from "./CartProductActions.module.css";
import Button from "../../../shared/Button/Button";
import classnames from "classnames";
import Plus from "../../../../Icons/Plus.svg";
import Minus from "../../../../Icons/Minus.svg";
import ChevronRight from "../../../../Icons/ChevronRight.svg";
import ChevronLeft from "../../../../Icons/ChevronLeft.svg";

class CartProductActions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      galleryCount: 0,
    };
  }

  gallerySwitcher = (e) => {
    const galleryLength = this.props.gallery.length - 1;

    const rightArrowSwitch = () => {
      if (this.state.galleryCount === galleryLength) {
        this.setState({ galleryCount: 0 });
      } else {
        this.setState((prev) => ({ galleryCount: prev.galleryCount + 1 }));
      }
    };

    const leftArrowSwitch = () => {
      if (this.state.galleryCount === 0) {
        this.setState({ galleryCount: galleryLength });
      } else {
        this.setState((prev) => ({ galleryCount: prev.galleryCount - 1 }));
      }
    };

    switch (e.target.id) {
      case "rightArrow":
        return rightArrowSwitch();

      case "leftArrow":
        return leftArrowSwitch();

      default:
        return;
    }
  };
  render() {
    const { size, id, gallery, quantity, name } = this.props;
    const productImageClasses = classnames(styles.productImage, {
      [styles.ImageCartPage]: size === "medium",
      [styles.ImageCartMini]: size === "mini",
    });
    return (
      <div className={styles.productCount}>
        <div className={styles.AddOrRemoveQuantity}>
          <Button
            buttonType="button"
            variant="primary"
            isIcon
            size={this.props.quantityBtnSize}
            onClick={() => this.props.handleAddProductQuantity(id)}
          >
            {Plus}
          </Button>
          <p>{quantity}</p>
          <Button
            buttonType="button"
            variant="primary"
            isIcon
            size={this.props.quantityBtnSize}
            onClick={() =>
              this.props.handleRemoveProductQuantity({ id, quantity })
            }
          >
            {Minus}
          </Button>
        </div>
        <div className={styles.productImageContainer}>
          {size === "medium" && (
            <div
              className={styles.productImageSwitcher}
              onClick={this.gallerySwitcher}
            >
              <img src={ChevronLeft} alt="Left Arrow" id="leftArrow" />
              <img src={ChevronRight} alt="Right Arrow" id="rightArrow" />
            </div>
          )}

          <img
            src={gallery[this.state.galleryCount]}
            alt={name}
            className={productImageClasses}
          />
        </div>
      </div>
    );
  }
}

export default CartProductActions;
