import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { PATH_DASHBOARD_BE } from "@constants/routes";
import { getServerSideSession } from "@utils/session";

export async function GET() {
    try {
        const session = await getServerSideSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorization" },
                { status: 401 }
            );
        }

        const response = await axios.get(`${PATH_DASHBOARD_BE}`, {
            headers: {
                Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (error?.response?.data) {
            return NextResponse.json(error?.response?.data, {
                status: axiosError.response?.status,
            });
        }
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}
