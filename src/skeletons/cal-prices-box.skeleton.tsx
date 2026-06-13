
import { Card } from '@/components'
import { Skeleton } from '@mui/material'
import React from 'react'

export default function CalPricesBoxSkeleton() {
    return (
        <div className=" lg:w-1/3 md:w-1/2 mt-2 w-full ">
            <Card className="rounded-lg ">
                <div>
                    <div className=" flex justify-between">
                        <div className=' flex    items-center'>
                            <Skeleton variant="circular" width={15} height={15} className=' mx-2' />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={17} ></Skeleton>
                        </div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={80} height={17} ></Skeleton>
                    </div>
                    <hr className="my-5" />
                    <div className=" flex    justify-between  ">
                        <div className=' flex items-center'>
                            <Skeleton variant="circular" width={15} height={15} className=' mx-2' />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={17} ></Skeleton>
                        </div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={80} height={17} ></Skeleton>
                    </div>
                    <hr className="my-5" />
                    <div className=" flex justify-between">
                        <div className='flex    items-center' >
                            <Skeleton variant="circular" width={15} height={15} className=' mx-2' />
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={70} height={17} ></Skeleton>
                        </div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={80} height={17} ></Skeleton>
                    </div>

                    <div className="w-full mt-10  mb-3  flex justify-center">
                        <Skeleton variant="rounded" sx={{ fontSize: '2rem' }} width={50} height={35} className=' !w-full' ></Skeleton>
                    </div>
                </div>
            </Card>
            {/* <Loading show={loading} /> */}
        </div>
    )
}
