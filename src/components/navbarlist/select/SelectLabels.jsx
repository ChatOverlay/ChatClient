import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "../../../context/ThemeContext";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function SelectLabels({
  options,
  selectedOption,
  setSelectedOption,
  location,
}) {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedCourse = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption({ id: selectedCourse.value, name: selectedCourse.label });
  };

  const renderValue = (value) => {
    const returnValue =
      location === "QuestionAdd" ? "수업을 선택해주세요" : "전체 보기";
    return (
      options.find((option) => option.value === value)?.label || returnValue
    );
  };
  const horizontalPosition =
    location === "QuestionAdd"
      ? windowWidth <= 480
        ? "left"
        : "right"
      : "left";

  return (
    <FormControl
      fullWidth
      sx={{ m: location === "QuestionAdd" ? 0 : 1, width: "auto" }}
    >
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        renderValue={renderValue}
        input={
          <OutlinedInput
            sx={{
              borderRadius: "0.4rem",
              color: theme.primaryColor,
              fontFamily: "Noto Sans KR",
              "& fieldset": {
                borderColor: theme.foreground,
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: theme.foreground,
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.foreground,
                borderWidth: "2px",
              },
              ".MuiInputBase-input": { color: theme.primaryColor },
            }}
          />
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: horizontalPosition,
          },
          transformOrigin: {
            vertical: "top",
            horizontal: horizontalPosition,
          },
          PaperProps: {
            style: {
              borderRadius: "0.5rem",
              width: "auto",
            },
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{ fontFamily: "Noto Sans KR" }}
            disabled={location === "QuestionAdd" && index === 0}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
