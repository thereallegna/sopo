import { NextResponse } from "next/server";
import { getServerSideSession } from "@utils/session";

export async function GET() {
    const session = await getServerSideSession();
    if (!session?.user?.isLoggedIn || !session.user.data) {
        return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.json({
        companyId: session.user.data.companyId,
        usercode: session.user.data.usercode,
        role: session.user.data.role,
    });
}
