import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
    try {
        // Menentukan lokasi file version.txt di folder root
        const versionFilePath = path.resolve(process.cwd(), "version.txt");

        // Membaca file secara asinkron
        const versionData = await fs.readFile(versionFilePath, "utf-8");

        // Mengembalikan isi file sebagai JSON
        return NextResponse.json({ version: versionData.trim() });
    } catch (error: any) {
        // Menangani jika ada error
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
