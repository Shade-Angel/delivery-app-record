import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import Toast from '@/components/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StripeProvider } from '@stripe/stripe-react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<AuthProvider>
						<SafeAreaProvider>
							<StripeProvider publishableKey={process.env.STRIPE_KEY as string}>
								<Navigation />
							</StripeProvider>					
						</SafeAreaProvider>				
					</AuthProvider>
					<StatusBar style='auto'></StatusBar>
					<Toast />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
