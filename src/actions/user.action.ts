"use server";
import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
interface datatype {
    name: string;
    lastName: string;
    nationalCode: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthDate: string;
}

export async function editUser(data: datatype) {
    return fetchInstance(endpoints.user.user, { method: "PATCH", body: { ...data } })

}
