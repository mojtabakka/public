import MuiConfig from '@/components/mui-config';
import '../globals.css'
import { ReactNode } from "react";
import ReduxProvider from '@/components/redux-provider';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
};

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (

        <body className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
            <MuiConfig>
                <CssBaseline />
                <Toaster position='bottom-right' />
                <ReduxProvider>
                    <div
                        className="min-h-screen flex items-center justify-center px-4 py-8"
                        dir="rtl"
                    >
                        {children}
                    </div>
                </ReduxProvider>
            </MuiConfig>
        </body>
    );
}
