import Button from "@/components/ui/button/Button";
import Loader from "@/components/ui/Loader";
import { IAuthFormData } from "@/types/auth.interface";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import AuthFields from "./AuthFields";
import { useAuthMutations } from "./useAuthMutations";

const Auth: FC = () => {
    const [isReg, setIsReg] = useState(false)

    const {handleSubmit, reset, control} = useForm<IAuthFormData>({
        mode: 'onChange'
    })

    const { loginSync, registerSync} = useAuthMutations(reset)

    const onSumbit:SubmitHandler<IAuthFormData> = data => {
        if(isReg) registerSync(data)
        else loginSync(data)
    }

    const isLoding = false

    return (
        <View className="mx-2 items-center justify-center h-full">
            <View className="w-9/12">
                <Text className="text-center text-black text-3xl font-medium mb-8">
                    {isReg ? 'Sing Up' : 'Login'}
                </Text>
                {isLoding ? (
                    <Loader /> 
                ) : (
                    <> 
                        <AuthFields control={control} />

                        <Button onPress={handleSubmit(onSumbit)}>
                            {isReg ? 'Sing Up' : 'Login'}
                        </Button>

                        <Pressable onPress={() => setIsReg(!isReg)}>
                            <Text className="text-black text-center text-base mt-6">
                                {isReg
                                    ? 'Already have an account ' 
                                    : "Don't have an account? "}
                                <Text className="text-[#47AA52]">
                                    {isReg ? 'Login' : 'Sign up'}
                                </Text>
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    )
}

export default Auth