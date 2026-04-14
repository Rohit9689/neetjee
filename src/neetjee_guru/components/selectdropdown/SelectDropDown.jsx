import React, { Component } from "react";
import Select from "react-select";

// custom styles
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black"
  })
};

class SelectDropDown extends Component {
  state = {
    selectedOption: null,
    isClearable: true,
    isSearchable: true
  };
  handleChange = selectedOption => {
    if (this.props.index != undefined) {
      if (this.props.handleChange != undefined && selectedOption != undefined)
        this.props.handleChange(
          this.props.index,
          this.props.name,
          selectedOption.value,
          selectedOption
        );

      this.setState({ selectedOption }, () =>
        console.log(`Option selected:`, this.state.selectedOption)
      );
    }
    else {
      if (this.props.handleChange != undefined && selectedOption != undefined)
        this.props.handleChange(
          this.props.name,
          selectedOption.value,
          selectedOption
        );

      this.setState({ selectedOption }, () =>
        console.log(`Option selected:`, this.state.selectedOption)
      );
    }

  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps", nextProps, this.props);
  //   if (nextProps.defaultValue != undefined) {
  //     if (nextProps.defaultValue !== this.props.value) {
  //       const option = this.props.options.find(
  //         op => op.id == nextProps.defaultValue
  //       );

  //       this.setState({ selectedOption: option });
  //     }
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    // console.log("getDerivedStateFromProps", props, state);

    if (state.selectedOption == null) {
      const option = props.options.find(op => op.id == props.defaultValue);

      // console.log("selected", option);
      return {
        selectedOption: option
      };
    } else if (props.defaultValue !== state.selectedOption.value) {
      const option = props.options.find(op => op.id == props.defaultValue);

      return {
        selectedOption: option
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const { selectedOption, isClearable, isSearchable } = this.state;

    console.log("this.props.isClearable", this.props.isClearable);
    return (
      <Select
        maxMenuHeight={200}
        name={() => {
          if (this.props.name != undefined) return this.props.name;
          else return this.props.placeholderName;
        }}
        styles={customStyles}
        components={this.props.dropdownIndicator}
        placeholder={this.props.placeholderName}
        value={this.props.stateData}
        onChange={
          this.props.prvsexams != undefined
            ? e => this.props.onChangefunct(e, this.props.prvsexams)
            : this.handleChange
        }
        //onChange={this.handleChange}
        options={this.props.options}
        isClearable={false}
        isSearchable={isSearchable}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

export default SelectDropDown;
