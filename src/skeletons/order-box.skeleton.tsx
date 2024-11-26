


import { Skeleton } from '@mui/material';
import React from 'react'

export default function OrderBoxSkeleton() {
    return (
        Array(2).fill(0).map((item, index) =>
            <div
                className="p-3 border mt-5  rounded-lg  bg-gray-50 "
                key={index}
            >
                <div className=" flex justify-between ">
                    <div className=" py-3 flex  justify-between w-full  md:text-base" >
                        <div className=" lg:w-1/5 md:w-1/3 w-1/2    text-gray-500">
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                        </div>
                        <div className=" w-full">
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={30} ></Skeleton>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Skeleton variant="circular" sx={{ fontSize: '2rem' }} width={20} height={20} ></Skeleton>
                    </div>
                </div>
                <div className="flex overflow-x-scroll bg-white rounded-lg items-center  ">
                    {Array(3).fill(0).map((item, index) => {
                        return (
                            <div className="flex  mx-2 mt-4 " key={index}>
                                <Skeleton variant='rounded' height={40} width={40} />
                            </div>
                        );
                    })}
                </div>
                <div className=" text-left p-3 text-medium mt-2 cursor-pointer flex justify-end">
                    <Skeleton variant='rounded' height={25} width={70} />
                </div>
            </div>)
    )
}
