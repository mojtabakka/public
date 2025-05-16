'use client'
import React from "react";
import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className=" cursor-pointer w-full mt-1 rounded  "
        >
            < div className=" relative shadow-sm  bg-white  hover:shadow-lg border rounded-lg w-full flex" >
                <div className="  w-full flex md:block sm:block lg:block justify-between ">
                    <div className=" w-full flex justify-center items-center  my-4 pr-4">
                        <Skeleton
                            variant="rounded"
                            className="w-24  mr-4 h-24 md:w-52 md:h-52 lg:!w-60 lg:h-60 object-cover"
                        />
                    </div>
                    <div className="w-full px-2  py-5 ">
                        <Skeleton variant="text" width={50} height={17} />
                        <div className="text-right mt-2 text-gray-500 text-xs ">
                            <Skeleton variant="text" width={50} height={17} />
                        </div>
                        <div className=" flex   text-left justify-between w-full items-center  ">
                            <div className="">
                                <div className=" text-right">
                                    <div className="p-1 text-sm flex items-center">
                                        <Skeleton variant="text" width={50} height={17} />
                                    </div>
                                    <div
                                        className="text-xs text-gray-400 px-1 flex "
                                        style={{ fontSize: "10px" }}
                                    >
                                        <span className="line-through">
                                            <Skeleton variant="text" width={50} height={17} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" p-2">
                    <Skeleton variant="text" width={50} height={17} />
                </div>
            </div >
        </div >
    );
};

export default ProductCardSkeleton
