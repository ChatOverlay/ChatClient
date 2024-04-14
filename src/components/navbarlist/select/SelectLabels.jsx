import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '../../../context/ThemeContext';

export default function SelectLabels({ options, setOptions, location }) {
  const { theme } = useTheme();
  const handleChange = (event) => {
    setOptions(event.target.value);
  };
  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          color: theme.primaryColor,
          fontWeight: 'bold',
          marginTop: '0.5rem',
          '.MuiInputLabel-root': {
            color: theme.foreground, // Label color
          },
          '.MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.foreground }, // Border color
            '&:hover fieldset': {
              borderColor: theme.foreground, // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.foreground, // Focus border color
            },
          },
          '.MuiInputBase-input': { color: theme.primaryColor },
          '.MuiSvgIcon-root': { color: theme.foreground }, // Dropdown arrow color
        }}
      >
        <Select
          value={options}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {location !== 'QuestionAdd' && (
            <MenuItem value='전체 보기'>전체 보기</MenuItem>
          )}
          <MenuItem value='소프트웨어공학'>소프트웨어공학</MenuItem>
          <MenuItem value='IT와 창업'>IT와 창업</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
