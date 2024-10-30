import { CreateNote, Home, Splash } from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: Home,
	},
	{
		name: 'CreateNote',
		component: CreateNote,
	},
] as const;
