import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Text } from '@components';
import { Ratio } from '@helpers';

interface IHeaderProps {
  label: string;
	align?: 'left' | 'center' | 'right';
}

const Header: React.FC<IHeaderProps> = ({ label, align = 'left' }) => {

	return (
		<View style={ styles.container } >
			<Text style={ { fontFamily: 'Poppins-SemiBold', fontSize: Ratio.normalizeValue(19), textAlign: align } }>{ label }</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 24,
		paddingBottom: 16,
	},
});

export default Header;
