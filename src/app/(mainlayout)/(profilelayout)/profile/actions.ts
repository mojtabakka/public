import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";

export const dynamic = "force-dynamic";
export async function getUser(): Promise<any> {
  const promise = fetchInstance(endpoints.user.user);
  return promise;
}

export async function updateUser(user: {
  name: string;
  lastname: string;
  nationalCode: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
}): Promise<any> {
  const promise = fetchInstance(endpoints.user.user, {
    method: "PATCH",
    body: { ...user },
  });
  return promise;
}
