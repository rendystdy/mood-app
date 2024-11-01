import { StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { Container, Header, Text } from '@components';
import { Colors } from '@constant';

import RadioGroup from 'react-native-radio-buttons-group';

const Settings = () => {
	const setModeChartDispatch = useAppDispatch(Actions.moodsAction.setModeChart);
	const modeChart = useAppSelector(state => state.moodsReducers.modeChart);

	const radioButtons = useMemo(() => ([
		{
			id: '1', // acts as primary key, should be unique and non-empty string
			label: 'Pie Chart',
			value: 'pie',
		},
		{
			id: '2',
			label: 'Bar Chart',
			value: 'bar',
		},
	]), []);

	const [selectedId, setSelectedId] = useState<string | undefined>(modeChart === 'pie' ? '1' : '2');

	const handleOnPress = (val: string) => {
		const filtered = radioButtons.filter(item => item.id === val);
		setSelectedId(val);
		setModeChartDispatch(filtered[0].value);
	};

	return (
		<Container
			noPadding
			noScroll
			barStyle='dark-content'
			contentContainerStyle={ { backgroundColor: Colors.white.default, flex: 1 } }>
			<View style={ styles.container }>
				<Header
					label='Settings'
					align='center' />
				<View style={ { paddingHorizontal: 16 } }>
					<Text>Select default data display:</Text>
					<RadioGroup
						containerStyle={ { alignItems: 'flex-start' } }
						radioButtons={ radioButtons }
						onPress={ val => handleOnPress(val) }
						labelStyle={ { fontFamily: 'Poppins-Regular' } }
						selectedId={ selectedId }
					/>
				</View>
			</View>
		</Container>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
