import React, { Component } from "react";

class DetectClickOutside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.triggerRef = React.createRef();
    this.nodeRef = React.createRef();
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    if (this.triggerRef.current?.contains(e.target)) {
      this.setState({ showMenu: !this.state.showMenu });
      return;
    }

    if (!this.nodeRef.current?.contains(e.target)) {
      this.setState({ showMenu: false });
    }
  };

  setShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  render() {
    return (
      <div>
        {this.props.render({
          showMenu: this.state.showMenu,
          setShowMenu: this.setShowMenu,
          triggerRef: this.triggerRef,
          nodeRef: this.nodeRef,
        })}
      </div>
    );
  }
}

export default DetectClickOutside;
