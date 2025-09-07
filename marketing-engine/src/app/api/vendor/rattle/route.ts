import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const file = path.join(process.cwd(), "public", "vendor", "gorattle.json");
    const raw = await fs.readFile(file, "utf8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to read JSON";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
