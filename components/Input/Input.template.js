import React from "react";
import InputMask from "react-input-mask";


const InputTemplate = ({
  defaultValue,
  id,
  label,
  max = null,
  name,
  placeholder,
  subText,
  type,
  value,
  onKeyDown,
  mask = false,
  maskpattern = null,
  onChange,
}) => {
  return (
    <>
      <div>
        {label && (
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 px-2 py-2"
            for="inline-full-name "
          >
            {label}
          </label>
        )}
      </div>
      <div>
        {mask ? (
          <input
            maxLength={max}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
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
      {subText && <span className="text-xs p-1">{subText}</span>}
    </>
  );
};

export default InputTemplate;
