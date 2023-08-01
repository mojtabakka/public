import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { ThreeDots } from "react-loader-spinner";
import style from "./OrderButton.module.scss";

const OrderButtonTemplate = ({
  onClickPlus,
  onClickBin,
  value = 0,
  loading = false,
}) => {
  return (
    <span className={` border p-2 rounded ${style.button__shodow}`}>
      <button className=" border-0">
        <span className="px-2 " onClick={onClickPlus}>
          <AiOutlinePlus className=" inline-block text-blue-400" />
        </span>
        <span className="px-2">
          {loading ? (
            <div className=" inline-block">
              <ThreeDots
                height="10"
                width="10"
                radius="9"
                color="#5FA4F9"
                ariaLabel="three-dots-loading"
                className="inline-block"
                visible={loading}
              />
            </div>
          ) : (
            <span className="text -blue-400">{value}</span>
          )}
        </span>
        <span className="px-2" onClick={onClickBin}>
          <ImBin className="text-red-400 inline-block " />
        </span>
      </button>
    </span>
  );
};

export default OrderButtonTemplate;
