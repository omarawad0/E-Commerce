import React from "react";
import styles from "./Circle.module.css";
import classnames from "classnames";

class Circle extends React.PureComponent {
  circleClasses = classnames(styles.circle, {
    [styles.swatchMini]: this.props.size === "mini",
    [styles.swatchMedium]: this.props.size === "medium",
  });
  render() {
    const { color, children } = this.props;
    return (
      <span
        className={this.circleClasses}
        style={{ backgroundColor: `${color}` }}
      >
        {children}
      </span>
    );
  }
}

export default Circle;
