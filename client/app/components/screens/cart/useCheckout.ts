import { useActions } from "@/hooks/useActions"
import { useCart } from "@/hooks/useCart"
import { useTypedNavigation } from "@/hooks/useTypedNavigation"
import { OrderService } from "@/services/order.service"
import { useStripe } from "@stripe/stripe-react-native"
import { useMutation } from "@tanstack/react-query"

export const useCheckout = () => {
    const {items} = useCart()
    const {reset} = useActions()
    const {navigate} = useTypedNavigation()

    const {initPaymentSheet, presentPaymentSheet} = useStripe()

    const {mutateAsync: placeOrder} = useMutation({
        mutationKey: ['place order'],
        mutationFn: () => OrderService.place({
            items: items.map(item => ({
                price: item.price,
                quantity: item.quantity,
                productId: item.product.id
            }))
        })
    })

    const onCheckout = async () => {
        try {
            const {clientSecret} = await placeOrder()

            const {error} = await initPaymentSheet({
                merchantDisplayName: 'Your Merchant Name',
                paymentIntentClientSecret: clientSecret
            })

            if(error) {
                console.error('Error initializing payment sheet: ', error)
                return
            }

            const {error: paymentError} = await presentPaymentSheet()
            if(paymentError) {
                console.error('Error presentinng payment sheet: ', paymentError)
                return
            }
            reset()
            navigate('Thanks')
        } catch(error) {
            console.error('Checkout error: ', error)
        }
    }

    return {onCheckout}
}