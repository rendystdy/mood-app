import { BackHandler, View } from 'react-native';
import React from 'react';

import { Container, Header, ListOfMoods } from '@components';
import { Colors } from '@constant';
import styles from './style';

const Home = () => {
	React.useEffect(() => {
		const backAction = () => {
			BackHandler.exitApp();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => backHandler.remove();
	}, []);

	return (
		<Container
			noPadding
			noScroll
			barStyle='dark-content'
			contentContainerStyle={ { backgroundColor: Colors.white.default, flex: 1 } }>
			<View style={ styles.container }>
				<Header label='How are you feeling right now?' />
				<ListOfMoods />
			</View>
		</Container>
	);
};

export default Home;
