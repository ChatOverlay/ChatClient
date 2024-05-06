import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "../../../context/ThemeContext";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function SelectLabels({ options, selectedOption, setSelectedOption, location }) {
  const { theme } = useTheme();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedCourse = options.find(option => option.value === selectedValue);
    setSelectedOption({ id: selectedCourse.value, name: selectedCourse.label });
  };

  const renderValue = (value) => {
    // "수업을 선택해주세요" 또는 다른 설명적 텍스트를 보여줌
    return options.find(option => option.value === value)?.label || "수업을 선택해주세요";
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        renderValue={renderValue}
        input={<OutlinedInput sx={{
          borderRadius: "0.5rem",
          color: theme.primaryColor,
          "& fieldset": {
            borderColor: theme.foreground,
            borderWidth: '2px',
          },
          "&:hover fieldset": {
            borderColor: theme.foreground,
            borderWidth: '2px',
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.foreground,
            borderWidth: '2px',
          },
          ".MuiInputBase-input": { color: theme.primaryColor },
        }} />}
      >
        {options.map((option, index) => (
          // "수업을 선택해주세요"는 질문 추가 위치에서만 비활성화
          <MenuItem key={option.value} value={option.value} disabled={location === "QuestionAdd" && index === 0}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
