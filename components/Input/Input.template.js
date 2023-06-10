import React from "react";
import InputMask from "react-input-mask";

const InputTemplate = ({
  checked,
  defaultValue,
  id,
  label,
  mask = false,
  maskpattern = null,
  max = null,
  name,
  placeholder,
  subText,
  type,
  value,
  onChange,
  onClick,
  onKeyDown,
  className,
}) => {
  return (
    <>
      <div>
        {label && (
          <label
            className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0  py-20 ${className}`}
            for="inline-full-name"
          >
            {label}
          </label>
        )}
      </div>
      <div>
        {type === "radio" ? (
          <input
            value={value}
            name={name}
            id={id}
            type={type}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  "
            onChange={onChange}
            checked={checked}
            onClick={onClick}
          />
        ) : mask ? (
          <input
            maxLength={max}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300 "
            name={name}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onKeyDown}
          />
        ) : (
          <InputMask
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
            mask={maskpattern}
            value={value}
            onChange={onChange}
            name={name}
            type={type}
          ></InputMask>
        )}
      </div>
      {subText && (
        <div className="text-xs p-1 my-1 text-gray-400">{subText}</div>
      )}
    </>
  );
};

export default InputTemplate;
