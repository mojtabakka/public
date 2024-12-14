

import { Drawer } from '@mui/material'
import React, { ReactNode } from 'react'
import MuiModal from '@mui/material/Modal';
interface propsType {
    title: string,
    onClose?: () => void,
    modalContent?: ReactNode,
    modalFooter?: ReactNode,
    className?: string,
    show?: boolean,
    sheetSubtitle?: string,
    sheetContent?: ReactNode,
    sheetFooter?: ReactNode
}
export default function Modal(props: propsType) {
    const { sheetContent, sheetFooter, sheetSubtitle, title, onClose, modalContent, modalFooter, className, show } = props
    return (
        <>
            <MuiModal
                open={show || false}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={`   h-full top-0  left-0 right-0    flex w-full items-center justify-center ${!show ? " hidden" : "lg:flex hidden z-50"
                    }`}
                style={{ zIndex: 100000 }}
            >
                <div className="   w-full max-w-2xl">
                    <div className="relative bg-white rounded-lg lg:shadow md:shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <div>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="defaultModal"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={` ${className}`}>{modalContent}</div>
                        {modalFooter && <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 text-left  justify-start">
                            {modalFooter}
                        </div>}
                    </div>
                </div>
            </MuiModal>
            <div
                id="defaultModal"
                tabIndex={-1}
                aria-hidden="true"
                className={`fixed top-0 left-0 right-0 z-10  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400 opacity-50           ${!show ? " hidden" : "lg:flex  hidden"
                    }`}
            ></div>
            <Drawer
                className=" inline-block lg:hidden "
                open={show}
                onClose={onClose}
                anchor="bottom"
            >
                <div>
                    <header>
                        <div className="p-3  rounded-lg">
                            <div>{title} </div>
                            <span className=" text-small text-gray-400 text-xs">
                                {sheetSubtitle}
                            </span>
                        </div>
                        <hr />
                    </header>
                    <div className=" bg-gray-100">
                        <div className={` ${className}   `}>{sheetContent}</div>
                        {sheetFooter && <span className="w-full  shadow-lg  fixed bg-white p-3 bottom-0 border flex justify-end">
                            {sheetFooter}
                        </span>}
                    </div>
                </div>

            </Drawer>
        </>
    )
}
