import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";
import axios, { AxiosError } from "axios";
import { PATH_COUNTRY_BE } from "@constants/routes";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;

        const session = await getServerSideSession();

        const response = await axios.get(`${PATH_COUNTRY_BE}`, {
            headers: {
                Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
            },
            params: {
                page_size: params.get("page_size"),
                page: params.get("current_page"),
                search: params.get("search"),
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

// create
export async function POST(req: Request) {
    try {
        const session = await getServerSideSession();

        const body = (await req.json()) as CountryFormBody;

        const response = await axios.post(PATH_COUNTRY_BE, body, {
            headers: {
                Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            return NextResponse.json(error?.response?.data, { status: 400 });
        }
        return NextResponse.json(
            { message: "Internal server error", error },
            { status: 500 }
        );
    }
}
