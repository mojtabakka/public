"use server";

import { cookies } from "next/headers";

export async function fetchInstance(
  url: string,
  data?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: any;
    headers?: HeadersInit;
    cache?: RequestCache;
  }
) {
  const cookieStore = cookies();
  const token = "" + cookieStore.get("token")?.value;
  const baseURL = "http://localhost:3003/api/";
  const request = new Request(`${baseURL}${url}`, {
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
    body: data?.body && JSON.stringify({ ...data.body }),
    cache: data?.cache,
    method: data?.method && data.method.toUpperCase(),
    credentials: "include",
    // ...data.headers,
  });

  const response = await fetch(request);
  if (!response.ok) throw await response.json();

  return response.json();
}

export async function getCookie(cname: string) {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) return "";
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
