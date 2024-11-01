/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { NavigationHelper, Ratio, useAppDispatch } from '@helpers';
import { Colors } from '@constant';
import styles from './style';
import { Actions } from '@store';
import IconHappy from '../../assets/images/icon_happy.svg';
import IconNeutral from '../../assets/images/icon_neutral.svg';
import IconSad from '../../assets/images/icon_sad.svg';
import IconStress from '../../assets/images/icon_stress.svg';

function Splash() {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		// save timeoutId to clear the timeout when the component re-renders
		const tm = setTimeout(() => {
			NavigationHelper.reset('TabNav');
		}, 3000);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<View style={ styles.container }>
			<View style={ styles.rowCenter }>
				<IconHappy width={ 20 } />
				<IconNeutral width={ 20 } />
				<IconSad width={ 20 } />
				<IconStress width={ 20 } />
			</View>
			<Text
				style={ { letterSpacing: 2, color: Colors.blue.default, fontFamily: 'Poppins-Bold', fontSize: 28 } }
			>
				Mood App
			</Text>
		</View>
	);
}

export default Splash;
