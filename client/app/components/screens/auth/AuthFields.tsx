import Field from "@/components/ui/field/Field";
import { IAuthFormData } from "@/types/auth.interface";
import { FC } from "react";
import { Control } from "react-hook-form";
import { validEmail } from "./email.regex";

interface IAuthFields {
    control: Control<IAuthFormData>
}

const AuthFields: FC<IAuthFields> = ({control}) => {
    return (
        <>
            <Field<IAuthFormData>
                placeholder="Enter email"
                control={control}
                name="email"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: validEmail,
                        message: 'Введите валидный адрес почты'
                    }
                }}
                keyboardType="email-address"
            />
            <Field<IAuthFormData>
                placeholder="Password"
                control={control}
                name="password"
                secureTextEntry
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Правильно введите пароль (минимум 6 символов)'
                    }
                }}
            />
        </>
    )
}

export default AuthFields