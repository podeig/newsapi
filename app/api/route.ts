"use server";

import { PAGE_SIZE } from "@/utils/config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const query = url.searchParams.get("query");
  const domain = url.searchParams.get("domain");

  const data = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&domains=${domain}&page=${page}&pageSize=${PAGE_SIZE}&sortBy=publishedAt&apiKey=${process.env.NEWSAPI_APIKEY}`
  );

  const dataJson = await data.json();

  if (dataJson.status === "error") {
    throw new Error(dataJson.message);
  }

  return NextResponse.json(dataJson);
}
