import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";
import axios, { AxiosError } from "axios";
import { PATH_SITE_BE } from "@constants/routes";

// export async function GET(req: NextRequest) {
//     try {
//         const params = req.nextUrl.searchParams;

//         const session = await getServerSideSession();
//         console.log("Session:", session);

//         console.log("Request params:", {
//             page_size: params.get("page_size"),
//             page: params.get("current_page"),
//             search: params.get("search"),
//         });
//         console.log("PATH_SITE_BE:", PATH_SITE_BE);

//         const response = await axios.get(`${PATH_SITE_BE}`, {
//             headers: {
//                 Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
//             },
//             params: {
//                 page_size: params.get("page_size"),
//                 page: params.get("current_page"),
//                 search: params.get("search"),
//             },
//         });

//         console.log("Response from backend:", response.data);

//         return NextResponse.json(response.data);
//     } catch (error: any) {
//         console.error("Error fetching site:", error);
//         const axiosError = error as AxiosError;
//         if (error?.response?.data) {
//             return NextResponse.json(error?.response?.data, {
//                 status: axiosError.response?.status,
//             });
//         }
//         return NextResponse.json(
//             { message: "Internal server error", error },
//             { status: 500 }
//         );
//     }
// }

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;

        const session = await getServerSideSession();

        const url = `${PATH_SITE_BE}?page_size=${
            params.get("page_size") || ""
        }&page=${params.get("current_page") || ""}&search=${
            params.get("search") || ""
        }`;

        const response = await axios.get(url.toString(), {
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

// // create
// export async function POST(req: Request) {
//     try {
//         const session = await getServerSideSession();

//         const body = (await req.json()) as SiteFormBody;

//         const response = await axios.post(PATH_SITE_BE, body, {
//             headers: {
//                 Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
//             },
//         });

//         return NextResponse.json(response.data);
//     } catch (error: any) {
//         const axiosError = error as AxiosError;
//         if (axiosError.response?.data) {
//             return NextResponse.json(error?.response?.data, { status: 400 });
//         }
//         return NextResponse.json(
//             { message: "Internal server error", error },
//             { status: 500 }
//         );
//     }
// }

// create
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSideSession();

        const body = (await req.json()) as SiteFormBody;

        const response = await axios.post(PATH_SITE_BE, body, {
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
