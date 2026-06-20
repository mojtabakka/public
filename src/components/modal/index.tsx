import React, { ReactNode } from "react";
import MuiModal from "@mui/material/Modal";
import { useMediaQuery, useTheme } from "@mui/material";
import { Drawer } from "vaul";

interface propsType {
    anchor?: "bottom" | "left" | "top" | "right";
    title: string | ReactNode;
    onClose?: () => void;
    modalContent?: ReactNode;
    modalFooter?: ReactNode;
    className?: string;
    show?: boolean;
    sheetSubtitle?: string;
    sheetContent?: ReactNode;
    sheetFooter?: ReactNode;
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
    } = props;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* ================= DESKTOP MODAL ================= */}
            {!isMobile && (
                <MuiModal
                    open={show || false}
                    onClose={onClose}
                    className="z-[100000] fixed inset-0 flex justify-center items-center"
                >
                    <>
                        {/* BACKDROP */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                            onClick={onClose}
                        />

                        {/* MODAL */}
                        <div className="relative flex flex-col bg-white dark:bg-gray-800 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">

                            {/* HEADER */}
                            <div className="flex justify-between items-center px-5 py-4 border-black/5 dark:border-white/10 border-b">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg tracking-tight">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="hover:bg-black/5 dark:hover:bg-white/10 p-2 rounded-full transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 px-5 py-4 overflow-y-auto text-gray-700 dark:text-gray-200">
                                {modalContent}
                            </div>

                            {/* FOOTER */}
                            {modalFooter && (
                                <div className="flex justify-end items-center gap-2 bg-gray-50/50 dark:bg-gray-900/30 px-5 py-4 border-black/5 dark:border-white/10 border-t">
                                    {modalFooter}
                                </div>
                            )}
                        </div>
                    </>
                </MuiModal>
            )}

            {/* ================= MOBILE BOTTOM SHEET (VAUL) ================= */}
            {isMobile && (
                <Drawer.Root
                    open={show}
                    onOpenChange={(open) => !open && onClose?.()}
                >
                    {/* BACKDROP */}
                    <Drawer.Overlay className="z-[9000] fixed inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* SHEET */}
                    <Drawer.Content
                        className="right-0 bottom-0 left-0 z-[10000] fixed flex flex-col bg-white dark:bg-gray-800 shadow-2xl rounded-t-3xl outline-none h-[85vh] overflow-hidden"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        {/* HANDLE */}
                        <div className="flex justify-center py-3">
                            <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-12 h-1.5" />
                        </div>

                        {/* HEADER */}
                        <div className="px-5 pb-3">
                            <div className="font-semibold text-gray-900 dark:text-white text-base">
                                {title}
                            </div>

                            {sheetSubtitle && (
                                <div className="mt-1 text-gray-500 dark:text-gray-400 text-xs">
                                    {sheetSubtitle}
                                </div>
                            )}
                        </div>

                        <div className="border-black/5 dark:border-white/10 border-t" />

                        {/* CONTENT */}
                        <div className="flex-1 px-5 py-4 overflow-y-auto text-gray-700 dark:text-gray-200">
                            <div className={className}>{sheetContent}</div>
                        </div>

                        {/* FOOTER */}
                        {sheetFooter && (
                            <div
                                className="bottom-0 sticky flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-3 border-black/5 dark:border-white/10"
                                style={{
                                    paddingBottom:
                                        "calc(12px + env(safe-area-inset-bottom))",
                                }}
                            >
                                {sheetFooter}
                            </div>
                        )}
                    </Drawer.Content>
                </Drawer.Root>
            )}
        </>
    );
}