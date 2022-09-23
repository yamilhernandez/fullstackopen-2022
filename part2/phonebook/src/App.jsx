import { useState } from 'react';
import Filter from '../components/Filter';
import Person from '../components/Person';
import PersonForm from '../components/PersonForm';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');

	const handleNameChange = (e) => {
		console.log(e.target.value);
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		console.log(e.target.value);
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		console.log(e.target.value);
		setNewFilter(e.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();

		const obj = {
			name: newName,
			number: newNumber,
		};
		if (
			persons.find((person) => JSON.stringify(person) === JSON.stringify(obj))
		) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(obj));
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<h2>add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				setNewName={handleNameChange}
				newNumber={newNumber}
				setNewNumber={handleNumberChange}
			/>
			<h2>Numbers</h2>
			{persons
				.filter((person) =>
					person.name.toLowerCase().includes(newFilter.toLowerCase())
				)
				.map(({ name, number }) => (
					<Person name={name} number={number} key={name} />
				))}
		</div>
	);
};

export default App;
