"use server";

import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next/types";

type ResponseData = {
  message: string;
};

export async function GET() {
  const data = await fetch(
    `https://newsapi.org/v2/everything?q=apple&from=2024-08-31&to=2024-08-31&pageSize=5&sortBy=publishedAt&apiKey=${process.env.NEWSAPI_APIKEY}`
  );
  const dataJson = await data.json();
  // console.log("data.status---", dataJson.message);
  if (dataJson.status === "error") {
    throw new Error(dataJson.message);
  }
  return NextResponse.json(dataJson);
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
//   //   res: NextApiResponse<ResponseData>
// ) {
//   //   const { title, post } = JSON.parse(req.body);

//   let data = await fetch(
//     "https://newsapi.org/v2/everything?q=apple&from=2024-08-31&to=2024-08-31&pageSize=5&sortBy=publishedAt&apiKey=d212c0de8e27483991f2c8c533d8f39d"
//   );
//   let posts = await data.json();

//   console.log("????????>", data);

//   // Then save the post data to a database
//   //   res.status(200).json({ message: "Post created successfully" });
//   res.status(200).json(data);
// }
