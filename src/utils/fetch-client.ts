"use client";
// import { loadEnvConfig } from "@next/env";
// loadEnvConfig(process.cwd());
export async function fetchInstanceClient<B = undefined>(
  url: string,
  data?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: B;
    headers?: HeadersInit;
    cache?: RequestCache;
  }
) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "api/";

  // Create a request configuration
  const requestConfig: RequestInit = {
    method: data?.method?.toUpperCase() || "GET", // Default to GET if no method is provided
    headers: {
      "Content-Type": "application/json",
      ...(data?.headers || {}),
    },
    body: data?.body ? JSON.stringify(data.body) : undefined, // Only include body if provided
    cache: data?.cache || "no-cache",
    credentials: "include", // Include credentials in the request
  };

  console.log("Base URL in client component:", process.env);

  // Perform the fetch request
  const response = await fetch(`${baseURL}${url}`, requestConfig);

  // Check for successful response
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse?.message || "Request failed");
  }

  // Return parsed JSON response (generic type for flexibility)
  return response.json();
}
