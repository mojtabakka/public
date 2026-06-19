"use server";

import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";

export async function getAddresses() {
    return fetchInstance(endpoints.address.address, {
        cache: "no-cache",
    });
}

export async function deleteAddress(id: string | number | undefined) {
    return fetchInstance(`${endpoints.address.address}/${id}`, {
        method: "DELETE",
        cache: "no-cache",
    });
}