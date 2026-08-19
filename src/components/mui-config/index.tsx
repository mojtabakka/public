

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
          borderRadius: '12px',
          transition: 'background-color 0.2s ease',
          '&.Mui-focused': {
            backgroundColor: 'white',
          },
          '&:where(.dark) .MuiOutlinedInput-root': {
            backgroundColor: '#1f2937',
          },
          '&.Mui-focused:where(.dark)': {
            backgroundColor: '#1f2937',
          },
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#423CAD",
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
