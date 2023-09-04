import React, { useState, ChangeEvent } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCancelSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onCancelSearch,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleClear = () => {
    setInputValue("");
    onChange("");
    onCancelSearch();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <TextField
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        sx={{
          width: "100%",
          "& fieldset": { border: "none", borderRadius: "10px" },
        }}
        {...props}
      />
      {inputValue && (
        <IconButton
          onClick={handleClear}
          style={{ width: "40px", height: "40px", alignSelf: "center" }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SearchBar;
