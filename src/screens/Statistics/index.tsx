import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container, Header } from '@components';
import { Colors } from '@constant';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useAppSelector } from '@helpers';
import IconHappy from '../../assets/images/icon_happy.svg';
import IconNeutral from '../../assets/images/icon_neutral.svg';
import IconSad from '../../assets/images/icon_sad.svg';
import IconStress from '../../assets/images/icon_stress.svg';

const IconComp = ({ icon, marginRight = 0, marginBottom = 0, width = 20, height = 20 } : {icon: 'Happy' | 'Neutral' | 'Sad' | 'Stress' | string, marginRight?: number; marginBottom?: number; width?: number; height?: number;}) => {

	switch (icon) {
		case 'Happy':
			return <IconHappy
				width={ width }
				height={ height }
				style={ { marginRight, marginBottom } } />;
		case 'Neutral':
			return <IconNeutral
				width={ width }
				height={ height }
				style={ { marginRight, marginBottom } } />;
		case 'Sad':
			return <IconSad
				width={ width }
				height={ height }
				style={ { marginRight, marginBottom } } />;
		case 'Stress':
			return <IconStress
				width={ width }
				height={ height }
				style={ { marginRight, marginBottom } } />;
		default:
			return null;
	}
};

const Statistic = () => {
	const moodData = useAppSelector(state => state.moodsReducers.moodData);
	const modeChart = useAppSelector(state => state.moodsReducers.modeChart);

	const moodCount = moodData.reduce((acc: Record<string, number>, entry) => {
		acc[entry.moodName] = (acc[entry.moodName] || 0) + 1;
		return acc;
	}, { Happy: 0, Neutral: 0, Sad: 0, Stress: 0 });
	
	const total = moodData.length;
	const moodPercentages = {
		happy: (moodCount.Happy || 0) / total * 100,
		neutral: (moodCount.Neutral || 0) / total * 100,
		sad: (moodCount.Sad || 0) / total * 100,
		stress: (moodCount.Stress || 0) / total * 100,
	};

	const pieData = [
		{ name: 'Happy', value: Math.floor(moodPercentages.happy), color: Colors.happyLabel },
		{ name: 'Neutral', value: Math.floor(moodPercentages.neutral), color: Colors.neutralLabel },
		{ name: 'Sad', value: Math.floor(moodPercentages.sad), color: Colors.sadLabel },
		{ name: 'Stress', value: Math.floor(moodPercentages.stress), color: Colors.stressLabel },
	];

	const barData = [
		{ name: 'Happy', value: Math.floor(moodPercentages.happy), color: Colors.happyLabel, frontColor: Colors.happyLabel, spacing: 0, barMarginBottom: 0, topLabelComponent: () => <IconComp
			icon={ 'Happy' }
			marginBottom={ 10 } /> },
		{ name: 'Neutral', value: Math.floor(moodPercentages.neutral), color: Colors.neutralLabel, frontColor: Colors.neutralLabel, spacing: 0, barMarginBottom: 0, topLabelComponent: () => <IconComp
			icon={ 'Neutral' }
			marginBottom={ 10 } /> },
		{ name: 'Sad', value: Math.floor(moodPercentages.sad), color: Colors.sadLabel, frontColor: Colors.sadLabel, spacing: 0, barMarginBottom: 0, topLabelComponent: () => <IconComp
			icon={ 'Sad' }
			marginBottom={ 10 } /> },
		{ name: 'Stress', value: Math.floor(moodPercentages.stress), color: Colors.stressLabel, frontColor: Colors.stressLabel, spacing: 0, barMarginBottom: 0, topLabelComponent: () => <IconComp
			icon={ 'Stress' }
			marginBottom={ 10 } /> },
	];

	return (
		<Container
			noPadding
			noScroll
			barStyle='dark-content'
			contentContainerStyle={ { backgroundColor: Colors.white.default, flex: 1 } }>
			<View style={ styles.container }>
				<Header
					label='Statistics'
					align='center' />
				<View style={ { paddingHorizontal: 16 } }>
					<View style={ [styles.wrapperChart, { paddingBottom: modeChart === 'pie' ? 24 : 0 }] }>
						{ modeChart === 'pie' && total > 0 ? (
							<PieChart
								data = { pieData }
								strokeWidth={ 3 }
								isAnimated
								strokeColor='#fff'
							/>
						) : total > 0 && (
							<BarChart
								data={ barData }
								yAxisThickness={ 0 }
								barBorderRadius={ 8 }
								xAxisThickness={ 0 }
								barMarginBottom={ 0 }
								yAxisTextStyle={ { color: 'red' } }
								hideAxesAndRules
								hideRules
								backgroundColor={ 'red' }
								isAnimated
								initialSpacing={ 15 }
								xAxisLabelsHeight={ 0 }
								barWidth={ 70 } />
						) }
					</View>
					<View style={ styles.content } >
						{ modeChart === 'pie' ? pieData.map((item, index) => {
							return (
								<View
									key={ index }
									style={ styles.listContent }>
									<View style={ { flexDirection: 'row', alignItems: 'center' } }>
										<IconComp
											icon={ item.name }
											marginRight={ 4 } />
										<Text style={ { color: item.color } }>{ item.name }</Text>
									</View>
									<Text>{ total > 0 ? item.value : 0 }%</Text>
								</View>
							);
						}) : barData.map((item, index) => {
							return (
								<View
									key={ index }
									style={ styles.listContent }>
									<View style={ { flexDirection: 'row', alignItems: 'center' } }>
										<IconComp
											icon={ item.name }
											marginRight={ 4 } />
										<Text style={ { color: item.color } }>{ item.name }</Text>
									</View>
									<Text>{ total > 0 ? item.value : 0 }%</Text>
								</View>
							);
						}) }
					</View>
				</View>
			</View>
		</Container>
	);
};

export default Statistic;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' },
	listContent: { width: '48%', flexDirection: 'row', backgroundColor: Colors.white.default, shadowColor: Colors.black.default, elevation: 2, shadowOpacity: 1, shadowRadius: 20, padding: 12, marginBottom: 16, borderRadius: 4, justifyContent: 'space-between' },
	wrapperChart: { backgroundColor: Colors.white.default, shadowColor: Colors.black.default, elevation: 5, shadowOpacity: 1, borderRadius: 6, justifyContent: 'center', alignItems: 'center', paddingTop: 24, marginBottom: 24 },
});
