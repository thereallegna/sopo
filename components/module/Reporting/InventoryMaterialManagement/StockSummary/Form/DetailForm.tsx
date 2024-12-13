// import React, { useState } from "react";
// import { Card, CardContent } from "@components/ui/Card";
// import TableForm from "@components/shared/TableForm";
// import { GET_INITIAL_STOCK } from "@constants/queryKey";
// import { getInitialStock } from "@services/fetcher/transaction/inventory-material-management";
// import { FieldPath } from 'react-hook-form';
// import { GenerateColumnsOption } from '../../../../../../types/client/table';
// import { FormType } from '../../../../../../types/form';

// const detailFormColumn: GenerateColumnsOption = {
//     columns: [
//         {
//             accessor: "number",
//             header: "#",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "warehouse_name",
//             header: "Warehouse",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "item_code",
//             header: "Item's Code",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "local_code",
//             header: "Local Code",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "item_name",
//             header: "Item's Name",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "active",
//             header: "Active",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "quantity",
//             header: "Quantity",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//         {
//             accessor: "uom",
//             header: "UOM",
//             type: "input",
//             inputProps: {
//                 disabled: true,
//             },
//         },
//     ],
//     hasAction: false,
// };

// const StockSummaryDetailForm = ({
//     errors,
//     watch,
//     setValue,
//     setError,
// }: // setError,
// // handleInputKeyDown,
// // disableAll,
// // type = 'add'
// FormType<StockSummaryFormBody>) => {
// }
