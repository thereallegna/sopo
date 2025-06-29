import React, { createContext, useContext } from "react";

interface TableContextType {
    type?: "default" | "form"; // Contoh parameter yang dikirimkan
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTableContext must be used within a TableProvider");
    }
    return context;
};

interface TableProviderProps {
    value: TableContextType;
    children: React.ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({
    value,
    children,
}) => <TableContext.Provider value={value}>{children}</TableContext.Provider>;
