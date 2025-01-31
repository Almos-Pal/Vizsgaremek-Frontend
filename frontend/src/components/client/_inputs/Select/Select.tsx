import React from "react";
import Select, { Props as SelectProps, GroupBase } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectProps<Option, boolean, GroupBase<Option>> {
  options: Option[]; // Options for the dropdown
  isMulti?: boolean; // Multi-select support
  isClearable?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, isMulti = false, isClearable = false, ...props }) => {
    const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          borderRadius: "12px",
          backgroundColor: "var(--color-light)", // Adjust background for input
          border: state.isFocused
            ? "2px solid var(--color-primary-50)"
            : "2px solid var(--color-grey-500)",
          boxShadow: state.isFocused ? "0 0 5px var(--color-primary-50)" : "none",
          color: "var(--color-light)",
          padding: "6px 0",
          cursor: "text",
          "&:hover": {
            borderColor: "var(--color-primary-50)",
          },
        }),
        menu: (provided: any) => ({
          ...provided,
          borderRadius: "12px",
          backgroundColor: "var(--color-grey-500)", // Matches dropdown background
          marginTop: "8px",
          overflow: "hidden",
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isFocused
            ? "var(--color-primary-50)" // Highlight color for hovered option
            : "var(--color-grey-500)",
          color: "var(--color-light)", // Text color
          fontWeight: state.isFocused ? "600" : "400", // Bold for active
          padding: "10px 16px", // Option spacing
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "var(--color-primary-50)",
          },
        }),
        singleValue: (provided: any) => ({
          ...provided,
          color: "var(--color-dark)", // Active selected option text color
        }),
        clearIndicator: (provided: any) => ({
          ...provided,
          color: "var(--color-dark)", // Clear button color
          padding: "8px", // Add some spacing for better visibility
          cursor: "pointer",
          "&:hover": {
            color: "var(--color-primary-50)",
          },
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: "var(--color-grey-300)", // Placeholder color
        }),
        indicatorSeparator: () => ({
          display: "none", // Removes the line separator
        }),
        multiValue: (provided: any) => ({
          ...provided,
          backgroundColor: "var(--color-primary-50)", // Background color for the selected tag
          borderRadius: "16px", // Rounded edges for the tag
          display: "flex",
          alignItems: "center",
          padding: "4px 8px", // Inner padding for the tag
          gap: "4px", // Space between label and clear button
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for a 3D effect
        }),
        multiValueLabel: (provided: any) => ({
          ...provided,
          color: "var(--color-light)", // Text color
          fontWeight: "500", // Make text slightly bold
          fontSize: "14px", // Adjust font size
        }),
        multiValueRemove: (provided: any) => ({
          ...provided,
          color: "var(--color-light)", // Clear icon color
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "var(--color-light)", // Highlighted background
            color: "var(--color-primary-50)", // Highlighted icon color
            borderRadius: "50%", // Circular hover effect
            padding: "4px", // Adjust padding for better spacing
          },
        }),
      };
      
      
    return (
    <Select
        styles={customStyles} // Custom
      options={options} 
      isMulti={isMulti} // Single or multiple selection
      isClearable={isClearable}
      className="basic-single" // Add classes if needed
      classNamePrefix="select" // Prefix for styling
      {...props} // Spread any additional props
    />
  );
};

export default SelectInput;