import { ICategory } from "@/types/category.interface"
import { request } from "./api/request.api"
import { getCategorieshUrl } from "@/config/api.config"

export const CategoryService = {
    async getAll() {
        return request<ICategory[]>({
            url: getCategorieshUrl(''),
            method: 'GET'
        })
    },
    async getBySlug(slug: string) {
        return request<ICategory[]>({
            url: getCategorieshUrl(`/by-slug/${slug}`),
            method: 'GET'
        })
    }
}