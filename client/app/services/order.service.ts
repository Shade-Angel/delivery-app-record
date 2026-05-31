import { IOrder } from "@/types/order.interface"
import { request } from "./api/request.api"
import { getOrdersUrl } from "@/config/api.config"

type TypeData = {
    items: {
        quantity: number
        price: number
        productId: string
    } []
}

export const OrderService = {
    async getAll() {
        return request<IOrder[]>({
            url: getOrdersUrl(''),
            method: 'GET'
        })
    },

    async getByUserId() {
        return request<IOrder[]>({
            url: getOrdersUrl('/by-slug'),
            method: 'GET'
        })
    },

    async place(data: TypeData) {
        return request<{clientSecret: string}>({
            url: getOrdersUrl(''),
            method: 'POST',
            data
        })
    }
}