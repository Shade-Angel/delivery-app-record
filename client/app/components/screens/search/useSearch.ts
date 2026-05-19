import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchForm } from "./useSearchForm"

export const useSearch = () => {
    const {searcTerm, debouncedSearch, control} = useSearchForm()
    
    const { data: products, isLoading } = useQuery({
        queryKey: ['search products', debouncedSearch],
        queryFn: () => ProductService.getAll(debouncedSearch),
        enabled: !!debouncedSearch
    })

    return { products, isLoading, control, searcTerm }
}