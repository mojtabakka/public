
import React, { ReactNode } from 'react'

export default function ModalFooter({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex items-center py-4 px-4 bg-white  space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 text-left  justify-start ${className}`}>
            {children}
        </div>
    )
}
