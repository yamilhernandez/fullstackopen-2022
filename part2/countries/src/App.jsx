import axios from 'axios';
import { useEffect, useState } from 'react';

import Results from '../components/Results';
import Search from '../components/Search';

function App() {
	const [filter, setFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState([]);

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
		//reset filter
		if (e.target.value === '') {
			setSearch([]);
		} else {
			//looks for exact match
			const exact = countries.find(
				({ name }) =>
					name.common.toLowerCase() === e.target.value.toLocaleLowerCase()
			);
			if (exact) {
				//looks for index of exact match
				const i = countries.findIndex(
					({ name }) =>
						name.common.toLowerCase() === e.target.value.toLocaleLowerCase()
				);
				//set modified search
				setSearch([countries[i]]);
			} else {
				//set search query
				setSearch(
					countries.filter((country) =>
						country.name.common
							.toLowerCase()
							.includes(e.target.value.toLowerCase())
					)
				);
			}
		}
	};
	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((res) => {
			setCountries(res.data);
		});
	}, []);

	return (
		<div className="App">
			<Search value={filter} onChange={handleFilterChange} />
			<Results
				search={search}
				setFilter={setFilter}
				handleFilter={handleFilterChange}
			/>
		</div>
	);
}

export default App;
