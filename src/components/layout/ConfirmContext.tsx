import { createContext, useContext, useState } from "react";
import { Spinner, SuccessIcon, ErrorIcon, WarningIcon } from "./ConfirmIcon";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmOptions = {
    type?: ConfirmType;
    title: string;
    message?: string;
};

type ConfirmContextType = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
};

type ConfirmType = "create" | "delete" | "warning" | "info";

const confirmStyles = {
    create: {
        bg: "bg-green-50",
        button: "bg-green-500 hover:bg-green-600",
    },
    delete: {
        bg: "bg-red-50",
        button: "bg-red-500 hover:bg-red-600",
    },
    warning: {
        bg: "bg-yellow-50",
        button: "bg-yellow-500 hover:bg-yellow-600",
    },
    info: {
        bg: "bg-blue-50",
        button: "bg-blue-500 hover:bg-blue-600",
    },
};


const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) throw new Error("useConfirm must be used inside ConfirmProvider");
    return context;
};

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<(value: boolean) => void>();
    const [isOpen, setIsOpen] = useState(false);


    const confirm = (opts: ConfirmOptions) => {
        setOptions(opts);
        setIsOpen(true);

        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const handleConfirm = () => {
        setIsOpen(false);
        resolver?.(true);
        setOptions(null);
    };

    const handleCancel = () => {
        setIsOpen(false);
        resolver?.(false);
        setOptions(null);
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            <AnimatePresence onExitComplete={() => setOptions(null)}>
                {isOpen && options && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                            }}

                            className={`w-80 flex flex-col text-center justify-center rounded-xl shadow-xl p-6 ${confirmStyles[options.type ?? "info"].bg}`}
                        >
                            <div className="flex flex-col items-center gap-3 mb-3">

                                <div className="w-10">
                                    <WarningIcon />
                                </div>

                                <h2 className="text-lg font-semibold">
                                    {options.title}
                                </h2>
                            </div>

                            {options.message && (
                                <p className="text-sm text-gray-600 mb-5">
                                    {options.message}
                                </p>
                            )}

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleConfirm}
                                    className={`px-4 py-2 text-white text-sm rounded-md transition ${confirmStyles[options.type ?? "info"].button}`}
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </ConfirmContext.Provider>
    );
};
