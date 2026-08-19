

import React, { ReactNode } from 'react'


export default function InputLabel({ children }: { children: ReactNode }) {
    return (
        <label className="pb-2 text-sm inline-block text-gray-600 dark:text-gray-400 transition-colors">
            {children}
        </label>
    );
}
