

import React, { ReactNode } from 'react'


export default function InputLabel({ children }: { children: ReactNode }) {
    return (

        <label className='pb-2 text-sm  inline-block text-gray-600s'>{children}</label>
    )
}
