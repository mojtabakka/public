"use server";

import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import { fetchInstanceClient } from "@/utils/fetch-client";

export async function fetchProducts(page: number = 1, data: any) {
  const params = new URLSearchParams({
    ...data,
    page: page.toString(),
    take: "8",
  });

  const products = await fetchInstanceClient(
    `${endpoints.product.getProducts}?${params}`,
    {
      cache: "no-cache",
    }
  );

  return products;
}
