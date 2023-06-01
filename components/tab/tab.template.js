import React from "react";

const tabTemplate = ({ items, onClick }) => {
  return (
    <div class="font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        {items.map((item) => (
          <li class="mr-2 cursor-pointer " onClick={() => onClick(item)}>
            <span class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default tabTemplate;
