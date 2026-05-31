import { useForm } from "react-hook-form"
import { ISearchFormData } from "./search.interface"
import { useDebounce } from "@/hooks/useDebounce"
import { useMemo } from "react"

export const useSearchForm = () => {
    const {control, watch} = useForm<ISearchFormData>({
        mode: 'onChange'
    })

    const searcTerm = watch('searchTerm')
    const debouncedSearch = useDebounce(searcTerm, 500)

    return useMemo(() => ({debouncedSearch, searcTerm, control}), [searcTerm, control, debouncedSearch])
}