import Layout from "@/components/layout/Layout";
import { FC } from "react";
import Header from "./Header";
import Banner from "./banner/Banner";

const Home: FC = () => {
    return (
        <Layout>
            <Header />
            <Banner />
        </Layout>
    )
}

export default Home