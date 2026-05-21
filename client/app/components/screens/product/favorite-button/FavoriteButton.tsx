import { FC } from "react"
import { useProfile } from "../../profile/useProfile"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserService } from "@/services/user.service"
import ProductButton from "../ProductButton"
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IFavoriteButton {
    productId: string
}

const FavoriteButton: FC<IFavoriteButton> = ({productId}) => {
    const {profile} = useProfile()

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationKey: ['toggle favorite'],
        mutationFn: () => UserService.toggleFavorite(productId),

        onSuccess(){
            queryClient.invalidateQueries({queryKey: ['get profile']})
        }
    })

    if(!profile) return null

    const isExists = profile.favorites.some(favorite => favorite.id === productId)

    return(
        <ProductButton onPress={() => mutate()}>
            {isExists ? (
                <MaterialCommunityIcons name="heart" size={22} color='#DC3F41' />
            ):(
                <MaterialCommunityIcons name="heart-outline" size={22} color="fff" />
            )}
        </ProductButton>
    )
}

export default FavoriteButton