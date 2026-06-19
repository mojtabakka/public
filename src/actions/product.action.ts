"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/";

export async function searchProductAction(query: string) {
  const res = await fetch(
    `${baseURL}product/search?search=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Search failed");
  }

  return res.json();
}