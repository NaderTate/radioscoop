import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const body = await request.formData();
  const response = await fetch("https://lensdump.com/api/1/upload", {
    method: "POST",
    body,
    headers: {
      "X-API-Key": `chv_sjTx_88633030250a91fa43688831e352bc703ffe651c579320b04dedc21d9ae92d97a0256d770ec907c7a34c51b360cded938aaa9729d26423bbf1f51ef82dfc4ea1`,
    },
  });
  const data = await response.json();
  return NextResponse.json({
    id: data.image.md5,
    Image: data.image.image.url,
  });
}
