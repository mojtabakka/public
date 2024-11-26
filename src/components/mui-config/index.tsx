

"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Arial","shabnam", sans-serif,', // Replace with your desired font family
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter", "Arial","shabnam"sans-serif', // Ensure the font applies to the entire document
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
          fontWeight: 1000
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: '4px',
          border: "1px soid red",
          '&.Mui-focused': {
            backgroundColor: 'white', // Background when focused
          },
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#5FA4F9",
    },
    secondary: {
      main: "#f50057",
    },
  },
});



export default function MuiConfig({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}
