import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import Toast from '@/components/ui/Toast'


export default function App() {
	return (
		<>
			<AuthProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>				
			</AuthProvider>
			<StatusBar style='auto'></StatusBar>
			<Toast />
		</>
	)
}
