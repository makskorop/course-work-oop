import { StyleSheet } from 'react-native';
import { FONTS } from '../../enums';

export const styles = StyleSheet.create({
	button: {
		height: 48,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	button_text: {
		fontSize: 16,
		fontFamily: FONTS.POPPINS_BOLD,
	},
	sticky_container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
