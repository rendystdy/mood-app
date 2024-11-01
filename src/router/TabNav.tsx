import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabScreens } from './screens';
import HomeActive from '../assets/images/home-active.svg';
import Home from '../assets/images/home-01.svg';
import StatisticsActive from '../assets/images/pie-chart-active.svg';
import Statistics from '../assets/images/pie-chart-01.svg';
import SettingsActive from '../assets/images/settings-active.svg';
import Settings from '../assets/images/settings-01.svg';
import { Colors } from '@constant';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import { Ratio } from '@helpers';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: any) {
	return (
		<View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 92, backgroundColor: 'white', shadowColor: Colors.black.default, shadowOffset: { width: 3, height: 4 }, shadowOpacity: 1, elevation: 20 } }>
			{ state.routes.map((route: any, index: number) => {
				const { options } = descriptors[route.key];
				const label =
          options.tabBarLabel !== undefined
          	? options.tabBarLabel
          	: options.title !== undefined
          		? options.title
          		: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				let icon;

				if (route.name === 'Home') {
					icon = isFocused
						? <HomeActive style={ { marginBottom: 3 } } />
						: <Home />;
				} else if (route.name === 'Statistics') {
					icon = isFocused
						? <StatisticsActive />
						: <Statistics />;
				} else if (route.name === 'Settings') {
					icon = isFocused
						? <SettingsActive />
						: <Settings />;
				}

				return (
					<TouchableOpacity
						key={ index.toString() }
						accessibilityRole='button'
						accessibilityState={ isFocused ? { selected: true } : {} }
						accessibilityLabel={ options.tabBarAccessibilityLabel }
						testID={ options.tabBarTestID }
						onPress={ onPress }
						onLongPress={ onLongPress }
						style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }
					>
						{ icon }
						<Text style={ { color: isFocused ? Colors.blue.default : Colors.black.default, fontSize: Ratio.normalizeValue(11) } }>
							{ label }
						</Text>
					</TouchableOpacity>
				);
			}) }
		</View>
	);
}

const TabNav = () => {
	return (
		<Tab.Navigator
			tabBar={ props => <MyTabBar { ...props } /> }
			screenOptions={ {
				headerShown: false,
			} }>
			{ TabScreens.map((screen, index) => {
				return (
					<Tab.Screen
						key={ index }
						name={ screen.name }
						component={ screen.component }
					/>
				);
			}) }
		</Tab.Navigator>
	);
};

export default TabNav;
