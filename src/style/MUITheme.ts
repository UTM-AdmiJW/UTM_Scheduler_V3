
import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material";

export const muiThemeOptions: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#81163f',
        },
        secondary: {
            main: '#9d2281',
        },
    },
});