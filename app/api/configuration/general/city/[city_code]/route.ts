import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";
import axios, { AxiosError } from "axios";
import { PATH_CITY_BE } from "@constants/routes";

export async function PUT(
    req: NextRequest,
    { params }: { params: { city_code: string } }
) {
    try {
        const session = await getServerSideSession();

        const { city_code } = params;

        const body = (await req.json()) as CityFormBody;
        body.province = body.province_code;

        const response = await axios.put(`${PATH_CITY_BE}/${city_code}`, body, {
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
