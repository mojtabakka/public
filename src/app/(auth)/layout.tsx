import MuiConfig from '@/components/mui-config';
import '../globals.css'
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ReduxProvider from '@/components/redux-provider';
import { CssBaseline } from '@mui/material';


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className='bg-[#EEEEEE]'>
            <body>
                <MuiConfig >
                    <CssBaseline />
                    <Toaster />
                    <ReduxProvider>
                        <div className=" p-4  bg-[#EEEEEE]" dir="rlt">{children}</div>
                    </ReduxProvider>
                </MuiConfig>
            </body>
        </html>
    );
}
