import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"

export const useProducts = () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['get products'],
        queryFn: () => ProductService.getAll(),
        select: data => data.slice(0, 4)
    })

    console.log('[useProducts] products:', products)   // 👈 лог
    console.log('[useProducts] error:', error) 
    return { products, isLoading }
}