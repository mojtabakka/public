import { Property } from '@/types/property.type';
import { englishToPersianNumbers } from '@/utils/function.utils';
import React from 'react';

interface PropsType {
    properties: Array<Property>;
    className?: string;
}

export default function Properties({ properties, className }: PropsType) {

    return (
        <div className={className}>
            {properties.map((item, index) => {
                return <div key={index} className="grid grid-cols-12 gap-4">
                    <div className=" lg:col-span-2 md:col-span-4 col-span-6">
                        <div className="p-4 font-extrabold"> {englishToPersianNumbers(item.title)} </div>
                        {properties.length - 1 !== index && < hr />}
                    </div>
                    <div className="lg:col-span-10 md:col-span-8 col-span-6">
                        <div className="p-4 text-gray-500"> {englishToPersianNumbers(item.property)} </div>
                        {properties.length - 1 !== index && < hr />}
                    </div>
                </div>
            })}
        </div>
    );
}
