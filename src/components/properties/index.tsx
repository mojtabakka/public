import { Property } from "@/types/property.type";
import { englishToPersianNumbers } from "@/utils/function.utils";
import clsx from "clsx";

interface PropsType {
    properties: Array<Property>;
    className?: string;
}

export default function Properties({
    properties,
    className,
}: PropsType) {
    return (
        <div
            className={clsx(
                "bg-white shadow-sm rounded-3xl overflow-hidden",
                className
            )}
        >
            <div className="divide-y divide-slate-100">
                {properties.map((item, index) => (
                    <div
                        key={index}
                        className="gap-4 grid grid-cols-12 hover:bg-slate-50 px-5 py-4 transition-colors duration-200"
                    >
                        <div className="col-span-5 md:col-span-4 lg:col-span-3">
                            <span className="text-slate-500 text-sm">
                                {englishToPersianNumbers(item.title)}
                            </span>
                        </div>

                        <div className="col-span-7 md:col-span-8 lg:col-span-9">
                            <span className="font-medium text-slate-900">
                                {englishToPersianNumbers(item.property)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}