import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white.default,
	},
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default styles;
