import React from "react";
// items config :

// {
//     title: ... ,
//     bgColor: ... ,
//     color: ... ,
//     border: ... ,
//     subTitle: ... ,
//     icon: ... ,
//     secondIcon: ... ,

// },
const Dropdown = ({ className, open, items }) => {
  return (
    <>
      <div
        dir="rtl"
        id="dropdown"
        className={` absolute w-full ${
          !open ? "hidden" : "inline-block"
        }  z-10   bg-white divide-y divide-gray-100 rounded shadow w-52 dark:bg-gray-700 ${className}`}
      >
        <ul
          class=" text-sm text-gray-700 dark:text-gray-200  w-full "
          aria-labelledby="dropdownDefaultButton"
        >
          {items?.length > 0 &&
            items.map((item, index) => (
              <>
                <li
                  style={{ backgroundColor: item?.bgColor, color: item?.color }}
                  className=" rounded  w-100 bg-red-50 w-full "
                >
                  <div className="w-full">
                    <a
                      href="#"
                      class="block  rounded  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-right"
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
              </>
            ))}
        </ul>
      </div>
    </>
  );
};

export { Dropdown };
