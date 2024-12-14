import React, { ReactNode } from 'react'

interface propsType {
    element: ReactNode,
    className: string
}

export default function LineElementLine(props: propsType) {
    const { element, className } = props
    return (
        <div className={`flex items-center ${className}`}>
            <div className='h-1 w-full  rounded border-t-2' />
            {element}
            <div className='h-1 w-full  rounded border-t-2' />
        </div>
    )
}
