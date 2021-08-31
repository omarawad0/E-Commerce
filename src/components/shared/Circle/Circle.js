import React, { Component } from "react";
import styles from "./Circle.module.css";
import classnames from "classnames";

class Circle extends Component {
  render() {
    const { color, size, children } = this.props;
    const circleClasses = classnames(styles.circle, {
      [styles.swatchMini]: size === "mini",
      [styles.swatchMedium]: size === "medium",
    });
    return (
      <span className={circleClasses} style={{ backgroundColor: `${color}` }}>
        {children}
      </span>
    );
  }
}

export default Circle;
