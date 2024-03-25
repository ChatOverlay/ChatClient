import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({ options, setOptions }) {
  const handleChange = (event) => {
    setOptions(event.target.value);
  };
  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: "15vw",
          color: "white",
          fontWeight: "bold",
          marginTop: "0.1rem",
          ".MuiInputLabel-root": { color: "#f2d492" }, // label color
          ".MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#f2d492" }, // border color
            "&:hover fieldset": { borderColor: "#f2d492" }, // hover border color
            "&.Mui-focused fieldset": { borderColor: "#f2d492" }, // focus border color
          },
          ".MuiInputBase-input": { color: "white" },

          ".MuiSvgIcon-root": { color: "#f2d492" }, // Dropdown arrow color
        }}
      >
        <Select
          value={options}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
        <MenuItem value="전체 보기">전체 보기</MenuItem> 
        <MenuItem value="소프트웨어공학">소프트웨어공학</MenuItem>
        <MenuItem value="IT와 창업">IT와 창업</MenuItem>
        
        </Select>
      </FormControl>
    </div>
  );
}
