import React, { useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import { isFunction } from "utils/function.util";
import useOutsideClick from "hooks/useOutsideClick";
import { isEmptyArray } from "../../utils/function.util";

const Dropdown = ({
  className,
  items,
  onClick,
  key,
  title,
  sheetTitle,
  sheetSubtitle,
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
    setOpen(false);
    isFunction(onClose) && onClose();
  };

  const ref = useOutsideClick(handleClickOutside);

  const onClickItem = (item) => {
    setOpen(!open);
    isFunction(onClick) && onClick(item);
  };
  const onClickTitle = () => {
    setOpen(!open);
  };
  return (
    <div className=" relative" dir="ltr" ref={ref}>
      <div onClick={onClickTitle} className=" cursor-pointer">
        {title}
      </div>
      <div
        dir="rtl"
        id="dropdown"
        className={` absolute w-full  p-3 ${
          !open ? "hidden" : "hidden  lg:inline-block "
        }  z-10   bg-white divide-y divide-gray-100 rounded shadow-xl w-52 dark:bg-gray-700 ${className}`}
      >
        <ul
          className=" text-sm text-gray-700 dark:text-gray-200  w-full "
          aria-labelledby="dropdownDefaultButton"
          key={key}
        >
          {!isEmptyArray(items) &&
            items.map((item, index) => (
              <span key={index + item.id}>
                <li
                  onClick={() => onClickItem(item)}
                  style={{ backgroundColor: item?.bgColor, color: item?.color }}
                  className=" rounded  w-100 w-full "
                  key={item.id}
                >
                  <div className="w-full" key={item.id}>
                    <a
                      href="#"
                      className="block  rounded  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-right"
                    >
                      <div className="flex items-center w-full  py-4 justify-between ">
                        <div className="flex items-center">
                          <span className="px-2">{item?.icon}</span>
                          <div>
                            <span> {item?.title} </span>
                            {item?.subTitle && (
                              <div className="text-right text-xs">
                                {item?.subTitle}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="px-2"> {item?.secondIcon} </div>
                      </div>
                    </a>
                  </div>
                </li>
                {item?.border && <div className="border"></div>}
              </span>
            ))}
        </ul>
      </div>
      <div>
        <Sheet
          className=" inline-block lg:hidden"
          isOpen={open}
          onClose={() => setOpen(false)}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header>
              <div className=" p-3">
                <div>{sheetTitle} </div>
                <span className=" text-small text-gray-400 text-xs">
                  {sheetSubtitle}
                </span>
              </div>
            </Sheet.Header>
            <Sheet.Content>
              <div className="p-5 ">
                {items.map((item, index) => (
                  <div
                    key={index + item.id}
                    className={`flex w-full mt-3 rounded cursor-pointer p-4 items-center border ${item.className}`}
                    onClick={() => onClickItem(item)}
                  >
                    <div className={`   rounded  text-sm w-full `}>
                      <div className="text-sm">{item.title}</div>
                      <span className="text-gray-400 text-xs">
                        {item.subTitle}
                      </span>
                    </div>
                    <div>{item.icon}</div>
                  </div>
                ))}
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onClick={() => setOpen(false)} />
        </Sheet>
      </div>
    </div>
  );
};

export { Dropdown };
