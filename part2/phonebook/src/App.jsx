import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Person from '../components/Person';
import PersonForm from '../components/PersonForm';
import Service from '../services/persons.js';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	useEffect(() => {
		Service.getAll().then((res) => {
			setPersons(res);
		});
	}, []);

	const handleNameChange = (e) => setNewName(e.target.value);

	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const handleFilterChange = (e) => setNewFilter(e.target.value);

	const handleDelete = ({ name, id }) => {
		if (window.confirm(`Delete ${name}`)) {
			Service.remove(id);
			setPersons(persons.filter((person) => person.id !== id));
		}
	};

	const addPerson = (event) => {
		event.preventDefault();

		let obj = {
			name: newName,
			number: newNumber,
		};

		const index = persons.findIndex((person) => person.name === obj.name);

		if (index === -1)
			Service.create(obj).then((res) => setPersons(persons.concat(res)));
		else {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with new one?`
				)
			) {
				let copy = [...persons];
				Service.update(copy[index].id, obj);
				copy[index].number = newNumber;
				setPersons(copy);
			}
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
				.map((person) => (
					<Person person={person} handleDelete={handleDelete} key={person.id} />
				))}
		</div>
	);
};

export default App;
