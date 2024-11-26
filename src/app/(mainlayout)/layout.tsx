
import '../globals.css'
import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/layout";
import ReduxProvider from "@/components/redux-provider";
import { Toaster } from 'sonner'
import MuiConfig from "@/components/mui-config";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className='bg-[#EEEEEE]'>
      <body>
        <MuiConfig >
          <CssBaseline />
          <Toaster />
          <ReduxProvider>
            <Layout />
            <div className=" p-4  bg-[#EEEEEE]" dir="rlt">{children}</div>
          </ReduxProvider>
        </MuiConfig>
      </body>
    </html>
  );
}
