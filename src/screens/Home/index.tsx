import { BackHandler, View } from 'react-native';
import React from 'react';

import { Container, Header, ListOfNotes } from '@components';
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
			contentContainerStyle={ { backgroundColor: Colors.black.default, flex: 1 } }>
			<View style={ styles.container }>
				<Header type='home' />
				<ListOfNotes />
			</View>
		</Container>
	);
};

export default Home;
