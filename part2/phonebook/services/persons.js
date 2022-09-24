import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(baseUrl).then((res) => res.data);
};
const create = (newPerson) => {
	return axios.post(baseUrl, newPerson).then((res) => {
		console.log(res.data);
		return res.data;
	});
};

const update = (id, newPerson) => {
	return axios.put(`${baseUrl}/${id}`, newPerson);
};

export default {
	getAll,
	create,
	update,
};
