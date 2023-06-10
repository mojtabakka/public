import React from "react";

function ModalTemplate({ title, children, footer, onClickClose, show }) {
  return (
    <>
      <div
        className={` fixed h-full top-0  left-0 right-0  z-50  flex w-full items-center justify-center ${
          !show ? " hidden" : ""
        }`}
      >
        <div class="   w-full max-w-2xl">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <div>
                <button
                  onClick={onClickClose}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-6">{children}</div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 text-left  justify-end">
              {footer}
            </div>
          </div>
        </div>
      </div>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class={`fixed top-0 left-0 right-0 z-10  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400 opacity-50           ${
          !show ? " hidden" : ""
        }`}
      ></div>
    </>
  );
}

export default ModalTemplate;
