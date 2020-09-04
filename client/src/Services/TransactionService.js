import http from '../http-common';

const get = period => {
	return http.get(`/api/transactio/${period}`);
};

const create = data => {
	return http.post('/api/transaction/', data);
};

const update = (id, data) => {
	return http.put(`/api/transaction/${id}`, data);
};

const remove = id => {
	return http.delete(`/api/transaction/${id}`);
};

export default {
	get,
	create,
	update,
	remove,
};
