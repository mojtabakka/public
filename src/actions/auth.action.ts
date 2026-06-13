"use server";

import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import { cookies } from "next/headers";

export async function logOut() {
    const cookieStore = cookies();
    const promise = fetchInstance(endpoints.auth.logout, {
        method: "POST",
    });
    cookieStore.set("token", "", {
        path: "/",
        expires: new Date(0),
    });
    return promise;
}
