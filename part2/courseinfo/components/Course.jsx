import React from 'react';
import Header from './Header';
import Part from './Part';

const Course = ({ course }) => {
	const getSum = () => {
		let sum = course.parts.reduce((p, c) => p + c.exercises, 0);
		return sum;
	};
	return (
		<>
			<Header name={course.name} />
			{course.parts.map((part) => (
				<Part part={part} key={part.id} />
			))}

			<strong>total of {getSum()} excercises</strong>
		</>
	);
};

export default Course;
