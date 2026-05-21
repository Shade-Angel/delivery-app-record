import { TypeRootParamList } from "@/navigation/navigation.types"
import { RouteProp, useRoute } from '@react-navigation/native'

export const useTypedRoute = <N extends keyof TypeRootParamList>() => useRoute<RouteProp<TypeRootParamList, N>>()
