import Button from "@/components/ui/button/Button"
import { FC } from "react"

interface IAddToCartButton {
    productId: string
}

const AddToCartButton: FC<IAddToCartButton> = ({productId}) => {
    return (
        <Button className="mt-6">Add to cart</Button>
    )
}

export default AddToCartButton