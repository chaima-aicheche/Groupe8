// src/theme.js
import { createTheme } from '@mui/material/styles';
import { palette, shadows, overrides } from './styles';

const theme = createTheme({
  palette: palette(),
  shadows: shadows(),
  components: overrides(),
});

export default theme;
