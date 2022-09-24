import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({ country }) => {
	const [weather, setWeather] = useState();
	useEffect(() => {
		axios
			.get('http://api.openweathermap.org/data/2.5/weather', {
				params: {
					q: country.capital[0],
					appid: import.meta.env.VITE_API_KEY,
					units: 'metric',
				},
			})
			.then((res) => setWeather(res.data));
	}, []);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area}</p>
			<h2>languages</h2>
			<ul>
				{Object.values(country.languages).map((lan) => (
					<li key={lan}>{lan}</li>
				))}
			</ul>
			<img src={country.flags.png} alt="flag" />
			<h1>Weather in {country.capital}</h1>
			<p>temperature {weather?.main.temp} Celcius</p>
			<img
				src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
				alt=""
			/>
			<p>wind {weather?.wind.speed} m/s</p>
		</div>
	);
};

export default Country;
