

import { Drawer, useMediaQuery, useTheme } from '@mui/material'
import React, { ReactNode } from 'react'
import MuiModal from '@mui/material/Modal';
interface propsType {
    anchor?: "bottom" | "left" | "top" | "right" | undefined,
    title: string | ReactNode,
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
    const {
        sheetContent,
        sheetFooter,
        sheetSubtitle,
        title,
        onClose,
        modalContent,
        modalFooter,
        className,
        show,
        anchor = "bottom",
    } = props;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* DESKTOP MODAL */}
            {!isMobile && (
                <MuiModal
                    open={show || false}
                    onClose={onClose}
                    className="fixed inset-0 flex items-center justify-center z-[100000]"
                >
                    <>
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={onClose}
                        />

                        <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg flex flex-col max-h-[90vh]">
                            {/* HEADER */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-xl font-semibold">
                                    {title}
                                </h3>

                                <button onClick={onClose}>✕</button>
                            </div>

                            {/* CONTENT */}
                            <div className="p-4 overflow-y-auto flex-1">
                                {modalContent}
                            </div>

                            {/* FOOTER */}
                            {modalFooter && (
                                <div className="p-4 border-t flex gap-2">
                                    {modalFooter}
                                </div>
                            )}
                        </div>
                    </>
                </MuiModal>
            )}

            {/* MOBILE DRAWER */}
            {isMobile && (
                <Drawer
                    className="lg:hidden"
                    open={show}
                    onClose={onClose}
                    anchor={anchor}
                >
                    <div style={{ height: "80vh" }}>
                        <header>
                            <div className="p-3">
                                <div>{title}</div>
                                <span className="text-xs text-gray-400">
                                    {sheetSubtitle}
                                </span>
                            </div>
                            <hr />
                        </header>

                        <div className="bg-gray-100 h-full overflow-y-auto">
                            <div className={className}>
                                {sheetContent}
                            </div>

                            {sheetFooter && (
                                <div className="fixed bottom-0 w-full bg-white p-3 border flex justify-end">
                                    {sheetFooter}
                                </div>
                            )}
                        </div>
                    </div>
                </Drawer>
            )}
        </>
    );
}
