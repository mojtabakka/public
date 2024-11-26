import React, { ReactNode } from "react";


interface PropsType {
    children: ReactNode,
    className?: string
}

export default function Card({ children, className }: PropsType) {
    return (
        <div className={`  bg-white items-center    p-6 ${className}`}>
            {children}
        </div>
    )
}
