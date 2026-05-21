import Layout from "@/components/layout/Layout";
import { FC } from "react";
import { useGetAllProducts } from "./useGetAllProducts";
import Loader from "@/components/ui/Loader";
import Catalog from "@/components/ui/catalog/Catalog";

const Explorer: FC = () => {
    const {products, isLoading} = useGetAllProducts()

    return (
        <Layout>
            {isLoading ? (
                <Loader />
            ): (
                <Catalog title="Explorer" products={products || []} />
            )}
        </Layout>
    )
}

export default Explorer