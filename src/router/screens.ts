import { Statistics, Home, Splash, Settings } from '@screens';
import TabNav from './TabNav';

export const StackScreens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'TabNav',
		component: TabNav,
	},
] as const;

export const TabScreens = [
	{
		name: 'Home',
		component: Home,
	},
	{
		name: 'Statistics',
		component: Statistics,
	},
	{
		name: 'Settings',
		component: Settings,
	},
] as const;
