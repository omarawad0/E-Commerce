import React, { Component } from "react";
import classnames from "classnames";
import styles from "./Button.module.css";
class Button extends Component {
  render() {
    const {
      isIcon,
      variant,
      size,
      children,
      id,
      stylesProps,
      buttonType,
      onClick,
      isSelected,
    } = this.props;
    const btnClasses = classnames(styles.btn, {
      [styles.btnPrimary]: variant === "primary",
      [styles.btnSecondary]: variant === "secondary",
      [styles.btnMini]: size === "mini",
      [styles.btnSmall]: size === "small",
      [styles.btnMedium]: size === "medium",
      [styles.btnLarge]: size === "large",
      [styles.btnFullWidth]: size === "fullWidth",
      [styles.miniBtnSelected]: size === "mini" && isSelected,
      [styles.mediumBtnSelected]: size === "medium" && isSelected,
    });

    const iconClasses = classnames({
      [styles.iconMini]: size === "mini",
      [styles.iconSmall]: size === "small",
    });
    return (
      <button
        onClick={onClick}
        type={buttonType}
        className={btnClasses}
        id={id}
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
