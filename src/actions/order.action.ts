"use server";

import { endpoints } from "@/utils/end-points";
import { fetchInstance } from "@/utils/fetch";
import { ORDER_STATUS } from "@/config/general.config";

export async function getCurrentOrder() {
    return await fetchInstance(
        endpoints.order.getCurrentOrder,
        {
            cache: "no-cache",
            
        }
    );
}

export async function getCurrentBasket(
    cartId: string
) {
    return await fetchInstance(
        endpoints.order.getCurrentBasket.replace(
            ":cartId",
            cartId
        ),
        {
            cache: "no-cache",
        }
    );
}

export async function changeOrderStatus(
    orderId: string
) {
    return await fetchInstance(
        endpoints.order.changeStatusorder.replace(
            ":id",
            orderId
        ),
        {
            method: "PATCH",
            body: {
                paymentMethod: ORDER_STATUS.payed,
                status: ORDER_STATUS.payed,
            },
        }
    );
}

export async function getCurrentOrders() {
    return fetchInstance(endpoints.order.getCurrentOrders, {
        cache: "no-cache",
    });
}

export async function getPreviousOrders() {
    return fetchInstance(endpoints.order.getPreviousOrders, {
        cache: "no-cache",
    });
}