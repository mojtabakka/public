import '../globals.css'
import { ReactNode } from "react";
import { Toaster } from "sonner";


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <Toaster />
            <body>
                <div className=" p-4">{children}</div>
            </body>
        </html>
    );
}
