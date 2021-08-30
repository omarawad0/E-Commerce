import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Button.module.css";
class Button extends Component {
  render() {
    /* variant, isSelected, isIcon, size, children, onClick, id */
    const {
      isIcon,
      variant,
      size,
      children,
      id,
      stylesProps,
      buttonType,
      onClick,
      isDisabled,
    } = this.props;
    const btnClasses = classnames(styles.btn, stylesProps, {
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
      <button
        onClick={onClick}
        type={buttonType}
        className={btnClasses}
        id={id}
        disabled={isDisabled}
        style={stylesProps}
      >
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
