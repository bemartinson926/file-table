import React, { Component } from 'react';

class SelectAllCheckbox extends Component {
  componentDidMount() {
    this.element.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.element.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const { selectAllHandler, indeterminate, selectAllChecked } = this.props;

    return (
      <input
        onChange={selectAllHandler}
        checked={selectAllChecked}
        ref={element => this.element = element}
        type="checkbox" />
    )
  }
}

export default SelectAllCheckbox;