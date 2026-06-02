import { ProductService } from "@/services/product.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchForm } from "./useSearchForm"
import Fuse from 'fuse.js'                   

export const useSearch = () => {
    const { searchTerm, debouncedSearch, control } = useSearchForm()
    
    const { data: allProducts, isLoading } = useQuery({
        queryKey: ['all-products'],         
        queryFn: () => ProductService.getAll(),
    })

    const fuse = allProducts
        ? new Fuse(allProducts, {
              keys: ['name'],
              threshold: 0.6,
              ignoreLocation: true,
          })
        : null

    let products: any[] = []
    if (debouncedSearch && fuse) {
        products = fuse.search(debouncedSearch).map(r => r.item)
    }


    return { products, isLoading, control, searchTerm }
}