import { NextResponse } from "next/server";
export async function GET() {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Cairo&APPID=042301fe54df60f809607cf76a6232fa`
  );
  const data = await response.json();
  return NextResponse.json({ weather: data });
}
