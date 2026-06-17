import { getToman } from "@/utils/function.utils";

interface Props {
  priceForUser: number;
  off: number;
}

export default function CartItemPrice({
  priceForUser,
  off,
}: Props) {
  const discount = priceForUser * (off / 100);
  const finalPrice = priceForUser - discount;

  return (
    <div className="flex flex-col">
      {!!off && (
        <div className="mt-3 text-red-400 text-xs lg:text-sm">
          {getToman(discount)}
          <span className="px-1">تومان تخفیف</span>
        </div>
      )}

      <div className="mt-1 font-black text-sm lg:text-sm">
        {getToman(finalPrice)}
        <span className="px-1">تومان</span>
      </div>
    </div>
  );
}