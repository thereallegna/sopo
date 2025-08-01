import { NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";
import axios from "axios";
import { PATH_AUTH_LOGIN_BE } from "@constants/routes";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as LoginFormBody;
        console.log("Menerima request dari frontend:", body);

        console.log("Mengirim request ke backend:", PATH_AUTH_LOGIN_BE);

        const response = await axios.post(PATH_AUTH_LOGIN_BE, body);
        console.log("Response dari backend:", response.data);

        const responseData = response.data as BasicResponse<UserAuthorization>;

        const session = await getServerSideSession({
            ttl: responseData.data.duration,
        });
        session.user = {
            isLoggedIn: true,
            data: {
                companyId: body.companyId,
                usercode: body.user_code,
                authorization: responseData.data,
            },
        };

        await session.save();
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error saat login:", error?.response?.data || error);
        if (error?.response?.data) {
            return NextResponse.json(error?.response?.data, { status: 400 });
        }
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
