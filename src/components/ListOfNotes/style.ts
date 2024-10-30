import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingBottom: 15,
		flex: 1,
	},
	content: {
		backgroundColor: Colors.gray.dark,
		borderRadius: 8,
		padding: 8,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapperDelete: {
		backgroundColor: Colors.gray.dark,
		justifyContent: 'center',
		paddingHorizontal: 6,
		alignItems: 'flex-end',
	},
	textDelete: {
		color: '#1b1a17',
		paddingHorizontal: 10,
		fontWeight: '600',
		paddingVertical: 20,
	},
});

export default styles;
