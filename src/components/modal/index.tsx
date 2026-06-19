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
                            className="absolute inset-0 bg-black/40"
                            onClick={onClose}
                        />

                        {/* MODAL */}
                        <div className="relative flex flex-col bg-white dark:bg-gray-700 shadow-lg mx-4 rounded-lg w-full max-w-2xl max-h-[90vh]">
                            {/* HEADER */}
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="font-semibold text-xl">{title}</h3>
                                <button onClick={onClose}>✕</button>
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                {modalContent}
                            </div>

                            {/* FOOTER */}
                            {modalFooter && (
                                <div className="flex gap-2 p-4 border-t">
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
                    <Drawer.Overlay
                        className="fixed inset-0 bg-black/40"
                        style={{ zIndex: 9000 }}
                    />

                    {/* SHEET */}
                    <Drawer.Content
                        style={{
                            zIndex: 10000,
                            WebkitTapHighlightColor: "transparent",
                        }}
                        className="right-0 bottom-0 left-0 fixed flex flex-col bg-white rounded-t-[28px] outline-none focus:outline-none h-[85vh] overflow-hidden"
                    >
                        {/* HANDLE */}
                        <div className="flex justify-center py-3">
                            <div className="bg-gray-300 rounded-full w-12 h-1.5" />
                        </div>

                        {/* HEADER */}
                        <div className="px-4 pb-2">
                            <div className="font-semibold text-base">
                                {title}
                            </div>

                            {sheetSubtitle && (
                                <div className="text-gray-400 text-xs">
                                    {sheetSubtitle}
                                </div>
                            )}
                        </div>

                        <hr />

                        {/* CONTENT */}
                        <div className="flex-1 pb-4 overflow-y-auto">
                            <div className={className}>
                                {sheetContent}
                            </div>
                        </div>

                        {/* FOOTER (PRO VERSION) */}
                        {sheetFooter && (
                            <div
                                className="bottom-0 z-10 sticky flex items-center gap-2 bg-white p-3"
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