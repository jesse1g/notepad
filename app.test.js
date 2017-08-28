const request = require('supertest');
const app = require('./app');

describe('Get a note', () => {
	test('It should respond with status 200', () => {
		return request(app).get('/note/2').then(response => {
			expect(response.statusCode).toBe(200);
		});
	});
});

describe('Get a notes', () => {
	test('It should respond with status 200', () => {
	return request(app).get('/note?limit=10&start=1&order=desc').then(response => {
		expect(response.statusCode).toBe(200);
		});
	});
});

describe('Missing note id', () => {
	test('It should respond with status 404', () => {
		return request(app).get('/note/1').then(response => {
			expect(response.statusCode).toBe(404);
		});
	});
});

describe('Add a note', () => {
	test('It should respond with status 200', () => {
		let note = {
			name: 'abc',
			content: 'abc'
		};
		return request(app).post('/note/add').send(note).then(response => {
			expect(response.statusCode).toBe(200);
		});
	});
});

describe('update a note', () => {
	test('It should respond with status 200', () => {
		let note = {
			name: 'deployed',
			content: 'deployed'
		};
		return request(app).put('/note/2').send(note).then(response => {
			expect(response.statusCode).toBe(200);
		});
	});
});