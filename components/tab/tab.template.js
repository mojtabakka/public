import React from "react";

const tabTemplate = ({ items, onClick }) => {
  return (
    <div className="font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {items.map((item, index) => (
          <li
          className="mr-2 cursor-pointer "
            onClick={() => onClick(item)}
            key={index}
          >
            <span className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default tabTemplate;
