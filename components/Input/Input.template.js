import React from "react";
import { useFormContext } from "react-hook-form";
import { findInputError } from "../../utils/function.util";
import ReactInputMask from "react-input-mask";
// import InputMask from "react-input-mask";

const InputTemplate = ({
  checked,
  defaultValue,
  id,
  label,
  mask = false,
  maskpattern = null,
  max = null,
  name,
  form,
  placeholder,
  subText,
  type,
  value,
  onChange,
  onClick,
  className,
  validations,
}) => {
  const data = useFormContext();
  const inputError = validations
    ? findInputError(useFormContext()?.formState?.errors, name)
    : null;

  const register = validations
    ? {
      ...data?.register(name, {
        ...validations,
        onChange: onChange,
      }),
    }
    : {};
  return (
    <>
      <div>
        {label && (
          <label
            className={`block text-gray-500 font-bold md:text-left mb-1 md:mb-0  py-3 ${className}`}
            for="inline-full-name"
          >
            {label}
          </label>
        )}
      </div>
      <div>
        {type === "radio" ? (
          <input
            form={form}
            value={value}
            name={name}
            id={id}
            type={type}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  "
            onChange={onChange}
            checked={checked}
            onClick={onClick}
            defaultValue={defaultValue}
            {...register}
          />
        ) : !mask ? (
          <input
            maxLength={max}
            form={form}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300 "
            name={name}
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}

            onChange={onChange}
            {...register}
          />
        ) : (
          <ReactInputMask
            onChange={onChange}
            form={form}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300 text-center  text-lg " dir="ltr"
            mask={maskpattern}
            value={value}
            name={name}
            type={type}
            defaultValue={defaultValue}
            {...register}
          />
        )}
      </div>
      {subText && (
        <div className="text-xs p-1 my-1 text-gray-400">{subText}</div>
      )}
      <div className="text-xs px-2 text-red-500   text-left py-1">
        {validations && inputError?.error?.message}
      </div>
    </>
  );
};

export default InputTemplate;
