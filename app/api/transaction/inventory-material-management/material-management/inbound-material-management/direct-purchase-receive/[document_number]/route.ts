import { NextRequest, NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";
import axios, { AxiosError } from "axios";
import { PATH_DIRECT_PURCHASE_RECEIVE_BE } from "@constants/routes";

export async function PUT(
    req: NextRequest,
    { params }: { params: { document_number: string } }
) {
    try {
        const session = await getServerSideSession();
        const body = (await req.json()) as DirectPurchaseReceiveDetailFormBody;

        // Decode the document_number from URL params
        const documentNumber = decodeURIComponent(params.document_number);

        const response = await axios.put(
            `${PATH_DIRECT_PURCHASE_RECEIVE_BE}/${encodeURIComponent(
                documentNumber
            )}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            return NextResponse.json(axiosError.response.data, {
                status: axiosError.response?.status || 400,
            });
        }
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { document_number: string } }
) {
    try {
        const session = await getServerSideSession();

        // Decode the document_number from URL params
        const documentNumber = decodeURIComponent(params.document_number);

        const response = await axios.get(
            `${PATH_DIRECT_PURCHASE_RECEIVE_BE}/${encodeURIComponent(
                documentNumber
            )}`,
            {
                headers: {
                    Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            return NextResponse.json(axiosError.response.data, {
                status: axiosError.response?.status || 404,
            });
        }
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { document_number: string } }
) {
    try {
        const session = await getServerSideSession();

        // Decode the document_number from URL params
        const documentNumber = decodeURIComponent(params.document_number);

        const response = await axios.delete(
            `${PATH_DIRECT_PURCHASE_RECEIVE_BE}/${encodeURIComponent(
                documentNumber
            )}`,
            {
                headers: {
                    Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data) {
            return NextResponse.json(axiosError.response.data, {
                status: axiosError.response?.status || 404,
            });
        }
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
