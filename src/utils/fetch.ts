"use server";
import { cookies } from "next/headers";
import { env } from "process";

export async function fetchInstance<B = undefined>(
  url: string,
  data?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: B;
    headers?: HeadersInit;
    cache?: RequestCache;
  }
) {
  const baseURL = env.NEXT_PUBLIC_BASE_URL + "api/";

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const requestConfig: RequestInit = {
    method: data?.method?.toUpperCase() || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
      ...(data?.headers || {}),
    },
    body: data?.body ? JSON.stringify(data.body) : undefined,
    cache: data?.cache || "no-cache",
    credentials: "include",
  };
  const response = await fetch(`${baseURL}${url}`, requestConfig);

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse?.message || "Request failed");
  }

  return response.json();
}
