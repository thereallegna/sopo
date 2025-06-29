import { FieldValues, Path, UseFormSetError } from "react-hook-form";

interface ErrorFields {
    [key: string]: string; // error field dengan key string dan value string
}

export const errorMapping = <T extends FieldValues>(
    errors: ErrorFields, // errors adalah objek dengan key sebagai nama field dan value sebagai pesan error
    setter: UseFormSetError<T> // setter adalah fungsi untuk menetapkan error
) => {
    // Iterasi setiap pasangan key-value dalam errors
    Object.entries(errors).forEach(([key, val]) => {
        // Pastikan val adalah string, jika tidak beri pesan default
        const errorMessage = typeof val === "string" ? val : "Error Field";

        // Set error untuk setiap field menggunakan setter
        setter(key as Path<T>, { type: "server", message: errorMessage });
    });
};
