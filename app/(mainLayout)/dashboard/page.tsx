"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@services/fetcher/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";

const Dashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <div className="flex flex-wrap -m-1">
                <div className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-[300px]">
                        <CardHeader className="flex flex-row items-center justify-between gap-2">
                            <CardTitle className="text-xl font-bold text-gray-700">
                                Initial Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {isLoading
                                    ? "Loading..."
                                    : data?.initialStockCount}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Total Transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-[300px]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xl font-bold text-gray-700">
                                Stock Adjustment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {isLoading
                                    ? "Loading..."
                                    : data?.stockAdjustmentCount}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Total Transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-[300px]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xl font-bold text-gray-700">
                                Stock Mutation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {isLoading
                                    ? "Loading..."
                                    : data?.stockMutationCount}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Total Transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-1">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-[300px]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xl font-bold text-gray-700">
                                Direct Purchase Receive
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {isLoading
                                    ? "Loading..."
                                    : data?.directPurchaseReceiveCount}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Total Transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
