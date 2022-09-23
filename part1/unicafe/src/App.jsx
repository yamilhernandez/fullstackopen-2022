import { useState } from 'react';

const GiveFeedback = ({ feedback, onChange }) => {
	const handleGood = () => {
		onChange({ ...feedback, good: feedback.good + 1 });
	};

	const handleNeutral = () => {
		onChange({ ...feedback, neutral: feedback.neutral + 1 });
	};

	const handleBad = () => {
		onChange({ ...feedback, bad: feedback.bad + 1 });
	};

	return (
		<div>
			<h1>give feedback</h1>
			<button onClick={handleGood}>good</button>
			<button onClick={handleNeutral}>neutral</button>
			<button onClick={handleBad}>bad</button>
		</div>
	);
};
const Statistics = ({ feedback }) => {
	const getTotal = () => {
		return feedback.bad + feedback.neutral + feedback.good;
	};

	const getAverage = () => {
		return (feedback.good - feedback.bad) / getTotal();
	};

	const getPositive = () => {
		return `${(feedback.good / getTotal()) * 100} %`;
	};

	if (getTotal() == 0) {
		return <p>No feedback given</p>;
	}
	// return (
	// 	<div>
	// 		<h1>statitics</h1>

	// 		<StatisticLine text={'good'} value={feedback.good} />
	// 		<StatisticLine text={'neutral'} value={feedback.neutral} />
	// 		<StatisticLine text={'bad'} value={feedback.bad} />
	// 		<StatisticLine text={'all'} value={getTotal()} />
	// 		<StatisticLine text={'average'} value={getAverage()} />
	// 		<StatisticLine text={'positive'} value={getPositive()} />
	// 	</div>
	// );
	return (
		<>
			<h1>statistics</h1>
			<table>
				<StatisticLine text="good" value={feedback.good} />
				<StatisticLine text="neutral" value={feedback.neutral} />
				<StatisticLine text="bad" value={feedback.bad} />
				<StatisticLine text="all" value={getTotal()} />
				<StatisticLine text="average" value={getAverage()} />
				<StatisticLine text="positive" value={getPositive()} />
			</table>
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td> {value}</td>
		</tr>
	);
};

const App = () => {
	// save clicks of each button to its own state
	// const [good, setGood] = useState(0);
	// const [neutral, setNeutral] = useState(0);
	// const [bad, setBad] = useState(0);
	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	});

	const handleChange = (obj) => {
		setFeedback(obj);
	};

	return (
		<div>
			<GiveFeedback feedback={feedback} onChange={handleChange} />
			<Statistics feedback={feedback} />
		</div>
	);
};

export default App;
