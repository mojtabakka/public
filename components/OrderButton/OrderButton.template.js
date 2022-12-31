import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import style from "./OrderButton.module.scss";

const OrderButtonTemplate = ({ onClickPlus, onClickBin, value = 1, max }) => {
  return (
    <span className={` border p-2 rounded ${style.button__shodow}`}>
      <button className=" border-0">
        <span className="px-2 " onClick={onClickPlus}>
          <AiOutlinePlus className=" inline-block" />
        </span>
        <span className="px-2">{value}</span>
        <span className="px-2" onClick={onClickBin}>
          <ImBin className="text-red-400 inline-block " />
        </span>
      </button>
    </span>
  );
};

export default OrderButtonTemplate;
