import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "../../../context/ThemeContext";
import OutlinedInput from "@mui/material/OutlinedInput"; // Import OutlinedInput

export default function SelectLabels({ options, setOptions, location }) {
  const { theme } = useTheme();
  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  const renderValue = (value) => {
    if (value === "") {
      return <span style={{ opacity: 0.6, fontFamily: 'Noto Sans KR' }}>수업을 골라주세요</span>;
    }
    return value;
  };

  return (
    <div style={{height : "100%"}}>
      <FormControl
        sx={{
          marginLeft: 1,
          ".MuiInputLabel-root": {
            color: theme.foreground, // Label color
          },
          ".MuiSvgIcon-root": { color: theme.foreground }, // Dropdown arrow color
        }}
      >
        <Select
          value={options}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          renderValue={renderValue}
          input={<OutlinedInput sx={{
            borderRadius: "0.5rem", // Apply borderRadius here
            color: theme.primaryColor,
            "& fieldset": {
              borderColor: theme.foreground, // Border color
              borderWidth: '2px', // Set the border width here
            },
            "&:hover fieldset": {
              borderColor: theme.foreground, // Hover border color
              borderWidth: '2px',
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.foreground, // Focus border color
              borderWidth: '2px',
            },
            ".MuiInputBase-input": { color: theme.primaryColor },
          }} />}
        >
          {options === "" &&
            <MenuItem value="" disabled dense>
              "수업을 골라주세요" 
            </MenuItem>
          }
          {location !== "QuestionAdd" && (
            <MenuItem value="전체 보기">전체 보기</MenuItem>
          )}
          <MenuItem value="소프트웨어공학">소프트웨어공학</MenuItem>
          <MenuItem value="IT와 창업">IT와 창업</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
