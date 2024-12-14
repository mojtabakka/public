import React from 'react'
import Image from 'next/image'
interface propsType {
    images: Array<{
        src: string
        main?: boolean

    }>
}

export default function Gallery(props: propsType) {
    const { images } = props
    const mainPhoto = images.find((item) => item.main)
    return (
        <div className=' flex flex-col  '>
            <Image src={mainPhoto?.src || ""} height={400} width={200} alt=' ' className=' h-[250px]  w-[250px]' />
            {
                <div className='  flex   py-3  gap-4  overflow-scroll   w-[200px]'>
                    {images.map((_, index) => <span key={index} className=' bg-red-50 border rounded   cursor-pointer  '> <Image src={mainPhoto?.src || ""} height={400} width={200} alt=' ' className=' h-[100px]  w-[100px]' /></span>)}
                </div>
            }

        </div>
    )
}
