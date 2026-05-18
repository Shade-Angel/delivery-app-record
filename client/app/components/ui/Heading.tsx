import { FC, PropsWithChildren } from "react"
import { Text } from "react-native"
import cn from 'clsx'

interface IHeading {
    isCenter?: boolean
    className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({
    children,
    isCenter = false,
    className
}) => {
    return (
        <Text className={cn(
                'text-black font-medium text-xl',
                isCenter && 'text-center',
                className
            )}
        >
            {children}
        </Text>
    )
}

export default Heading