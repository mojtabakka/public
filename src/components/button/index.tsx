import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab'
interface other {
    loading?: boolean;
}
interface PropsType extends ButtonProps, other { }

export default function muiButton(props: PropsType) {
    const { children } = props
    return (
        <LoadingButton variant='text' className='text-white'  {...props}>
            {children}
        </LoadingButton>
    )
}
