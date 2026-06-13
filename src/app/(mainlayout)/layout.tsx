
import '../globals.css'
import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/layout";
import ReduxProvider from "@/components/redux-provider";
import MuiConfig from "@/components/mui-config";
import { Toaster } from 'react-hot-toast';


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className='bg-[#EEEEEE]'>
      <body>
        <MuiConfig >
          <CssBaseline />
          <Toaster />
          <ReduxProvider>
            <Layout />
            <div className="bg-[#EEEEEE] p-4" dir="rtl">{children}</div>
          </ReduxProvider>
        </MuiConfig>
      </body>
    </html>
  );
}
