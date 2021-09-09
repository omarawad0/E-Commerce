import React from "react";
import classnames from "classnames";
import styles from "./Button.module.css";
class Button extends React.PureComponent {
  renderButtonContent = () => {
    const { size, isIcon, children } = this.props;
    const iconClasses = classnames({
      [styles.iconMini]: size === "mini",
      [styles.iconSmall]: size === "small",
    });
    return isIcon ? (
      <img src={children} alt="" className={iconClasses} />
    ) : (
      children
    );
  };

  render() {
    const { variant, size, id, stylesProps, buttonType, onClick, isSelected } =
      this.props;
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

    return (
      <button
        onClick={onClick}
        type={buttonType}
        className={btnClasses}
        id={id}
        style={stylesProps}
      >
        {this.renderButtonContent()}
      </button>
    );
  }
}

export default Button;
