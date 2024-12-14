
"use client"
import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import Logo from '@/components/logo';

export default function Loading() {
    return (
        <>
            <div
                className={`flex items-center justify-center h-full w-full fixed top-0 right-0 z-50  `}
            >
                <div
                    className={`bg-white p-20 rounded-lg`}
                >
                    <h1 className="text-center flex justify-center w-full text-lg">
                        <Logo height={100} width={100} />
                    </h1>
                    <div className=" flex justify-center">
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="blue"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                        />
                    </div>
                </div>
            </div>
            <div
                className={` z-10 fixed flex justify-center bg-gray-400 w-full h-full top-0 right-0  items-center opacity-50 `}
            ></div>
        </>
    )
}
