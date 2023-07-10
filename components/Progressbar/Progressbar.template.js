import React from "react";

function ProgressbarTemplate({ color, width }) {
  return (
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        class=" rounded-full h-2 "
        style={{ background: color, width: `${width + "%"}` }}
      ></div>
    </div>
  );
}

export default ProgressbarTemplate;
