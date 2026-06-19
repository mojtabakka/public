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
  try {
    const baseURL = env.NEXT_PUBLIC_BASE_URL + "/";

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const requestConfig: RequestInit = {
      method: data?.method?.toUpperCase() || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
        ...(data?.headers || {}),
      },
      body: data?.body ? JSON.stringify(data.body) : undefined,
      cache: data?.cache || "no-cache",
      credentials: "include",
    };
    // console.log(`${baseURL}${url}`)
    const response = await fetch(`${baseURL}${url}`, requestConfig);
    if (!response.ok) {
      let errorResponse: any;

      try {
        errorResponse = await response.json();
      } catch {
        errorResponse = null;
      }

      const error = new Error(
        errorResponse?.message || "Request failed"
      );

      // 👇 اینجا لاگ درست به Sentry

      throw error;
    }

    return response.json();
  } catch (err) {
    // 👇 network error یا fetch crash
    // Sentry.captureException(err);

    throw err;
  }
}