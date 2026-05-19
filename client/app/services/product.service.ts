import { IProduct } from "@/types/product.interface"
import { request } from "./api/request.api"
import { getProductsUrl } from "@/config/api.config"

export const ProductService = {
    async getAll(searcTerm?: string) {
        return request<IProduct[]>({
            url: getProductsUrl(''),
            method: 'GET',
            params: searcTerm 
            ? {
                searcTerm
            } : {}
         })
    },
    async getBySlug(slug: string) {
        return request<IProduct[]>({
            url: getProductsUrl(`/by-slug/${slug}`),
            method: 'GET'
        })
    },
    async getByCategories(categorySlug: string) {
        return request<IProduct[]>({
            url: getProductsUrl(`/by-category/${categorySlug}`),
            method: 'GET',
            data: {categorySlug}
        })
    }
}