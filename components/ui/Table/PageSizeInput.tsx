import React, { InputHTMLAttributes, useRef, useState } from "react";

type PageSizeInputProps = {
    helperValues: number[];
    onChangePageSize: (val: number) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const PageSizeInput = ({
    helperValues,
    onChangePageSize,
    ...props
}: PageSizeInputProps) => {
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Menangani klik di luar input atau modal untuk menutup modal
    const handleClickOutside = (e: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(e.target as Node)
        ) {
            setShowModal(false);
        }
    };

    React.useEffect(() => {
        // Daftarkan event listener untuk klik luar
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Bersihkan event listener saat komponen unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {/* Input Field */}
            <input
                ref={inputRef}
                type="number"
                onFocus={() => setShowModal(true)} // Tampilkan modal saat fokus
                className="w-[28px] h-[28px] border-[1px] border-Neutral-200 rounded-rounded-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
                placeholder="0"
                onChange={(e) => onChangePageSize(parseFloat(e.target.value))}
                {...props}
            />

            {/* Modal Helper */}
            {showModal && (
                <div
                    ref={modalRef}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg z-10"
                >
                    <div className="flex flex-col p-1">
                        {helperValues.map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    onChangePageSize(val);
                                }}
                                className="p-1 text-left hover:bg-[#EFF8FF] rounded"
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageSizeInput;
