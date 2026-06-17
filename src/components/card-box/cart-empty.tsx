import Image from "next/image";

export default function CartEmpty() {
    return (
        <div className="flex justify-center items-center p-20 h-full text-gray-400 text-base lg:text-lg">
            <div className="flex flex-col items-center">
                <Image
                    src="/images/empty-cart.png"
                    alt="empty cart"
                    width={300}
                    height={300}
                />

                <div className="text-center">
                    سبد شما خالی است
                </div>
            </div>
        </div>
    );
}