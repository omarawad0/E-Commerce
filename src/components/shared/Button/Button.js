import React from "react";
import classnames from "classnames";
import styles from "./Button.module.css";
class Button extends React.PureComponent {
  btnClasses = classnames(styles.btn, {
    [styles.btnPrimary]: this.props.variant === "primary",
    [styles.btnSecondary]: this.props.variant === "secondary",
    [styles.btnMini]: this.props.size === "mini",
    [styles.btnSmall]: this.props.size === "small",
    [styles.btnMedium]: this.props.size === "medium",
    [styles.btnLarge]: this.props.size === "large",
    [styles.btnFullWidth]: this.props.size === "fullWidth",
    [styles.miniBtnSelected]:
      this.props.size === "mini" && this.props.isSelected,
    [styles.mediumBtnSelected]:
      this.props.size === "medium" && this.props.isSelected,
  });
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
    const { id, stylesProps, buttonType, onClick } = this.props;

    return (
      <button
        onClick={onClick}
        type={buttonType}
        className={this.btnClasses}
        id={id}
        style={stylesProps}
      >
        {this.renderButtonContent()}
      </button>
    );
  }
}

export default Button;
