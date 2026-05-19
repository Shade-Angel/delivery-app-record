import Home from "@/components/screens/home/Home";
import { IRoute } from "./navigation.types";
import Search from "@/components/screens/search/Search";
import Explorer from "@/components/screens/explorer/Explorer";
import Favorites from "@/components/screens/favorites/Favorites";
import Profile from "@/components/screens/profile/Profile";
import Cart from "@/components/screens/cart/Cart";
import Category from "@/components/screens/category/Category";

export const routes:IRoute[] = [  
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Favorites',
        component: Favorites
    },
    {
        name: 'Search',
        component: Search
    },
    {
        name: 'Explorer',
        component: Explorer
    },
    {
        name: 'Profile',
        component: Profile
    },
    {
        name: 'Cart',
        component: Cart
    },
    {
        name: 'Category',
        component: Category
    }
]