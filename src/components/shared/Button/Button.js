import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Button.module.css";
import Plus from "../../../Icons/Plus.svg";
class Button extends Component {
  render() {
    /* variant, isSelected, isIcon, size, children, onClick, id */
    const { isIcon, variant, size, children } = this.props;
    const btnClasses = classnames(styles.btn, {
      [styles.btnPrimary]: variant === "primary",
      [styles.btnSecondary]: variant === "secondary",
      [styles.btnVerySmall]: size === "verySmall",
      [styles.btnSmall]: size === "small",
      [styles.btnMedium]: size === "medium",
      [styles.btnLarge]: size === "large",
      [styles.btnFullWidth]: size === "fullWidth",
    });

    const iconClasses = classnames({
      [styles.iconVerySmall]: size === "verySmall",
      [styles.iconSmall]: size === "small",
    });
    return (
      <button type="button" className={btnClasses}>
        {isIcon ? (
          <img src={children} alt="" className={iconClasses} />
        ) : (
          children
        )}
      </button>
    );
  }
}

export default Button;
