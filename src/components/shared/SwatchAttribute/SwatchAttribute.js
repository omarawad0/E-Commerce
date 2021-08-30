import React, { Component } from "react";
import styles from "./SwatchAttribute.module.css";
import classnames from "classnames";

class SwatchAttribute extends Component {
  render() {
    const { color, size } = this.props;
    const swatchClasses = classnames(styles.circle, {
      [styles.swatchMini]: size === "mini",
      [styles.swatchLarge]: size === "large",
    });
    return (
      <span
        className={swatchClasses}
        style={{ backgroundColor: `${color}` }}
      ></span>
    );
  }
}

export default SwatchAttribute;
