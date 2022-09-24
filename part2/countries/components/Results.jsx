import Country from './Country';

const Results = ({ search, setFilter, handleFilter }) => {
	if (search.length === 0) return <p>No Match, specify another filter</p>;

	if (search.length > 10)
		return <p>Too many matches, specify another filter</p>;

	if (search.length === 1) return <Country country={search[0]} />;

	return (
		<div>
			{search.map((country) => {
				return (
					<div key={country.name.common}>
						<p>
							{country.name.common}{' '}
							<button
								onClick={() => {
									setFilter(country.name.common);
									handleFilter({ target: { value: country.name.common } });
								}}
							>
								show
							</button>
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Results;
