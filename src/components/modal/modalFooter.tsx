
import React, { ReactNode } from 'react'

export default function ModalFooter({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex items-center py-4 px-4 md:bg-white  space-x-2  md:border-gray-200 md:rounded-b dark:border-gray-600 text-left mt-10 md:mt-0  justify-start ${className}`}>
            {children}
        </div>
    )
}
