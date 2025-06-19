import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/components/root-navigator';
import { AuthProvider } from './components';

export const App = () => {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<RootNavigator />
			</AuthProvider>
		</SafeAreaProvider>
	);
};

