const path = require('path');
// postgresql
const promise = require('bluebird');
const pg = require('pg-promise');

module.exports = function(app)  {
	// connect to db
	let pgp = pg({promiseLib: promise});
	pgp.pg.defaults.ssl = true;
	const db = pgp(process.env.POSTGRESQL_URI);

	// API
	// GET /note/:id 
	app.get('/note/:id', function(req, res) {
		// grab data from db
		db.one('SELECT id,name,content FROM notes WHERE id = $1',req.params.id)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((e) => {
				console.log(e);
				return res.status(404).json({'error':'Not found'});
			});
	});

	// GET /note?limit=10&start=1&order=asc 
	app.get('/note', function(req, res) {
		//check if request queries are valid
		const start = (req.query.start) ? req.query.start : 1;
		const order = (req.query.order && !req.query.order.toLowerCase().localeCompare('asc')) ? req.query.order : 'DESC';
		const limit = (req.query.limit && !isNaN(req.query.limit) && isFinite(req.query.limit)) ? req.query.limit : 'ALL';			
		// grab data from db
		db.any('SELECT id,name,content FROM notes WHERE id >= $1 ORDER BY $2~ $3^ LIMIT $4^',[start, 'date_created', order, limit])
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((e) => {
				console.log(e);
				return res.status(404).json({'error':'Not found'});
			});
	});

	// POST /note/add 
	app.post('/note/add', function(req, res) {
		// error handling
		if (!req.body.name || !req.body.content) {
			return res.status(400).json({'error':'No name or content found'});
		}
		if (req.body.name.length > 50) {
			return res.status(400).json({'error':'Name too long'});
		}
		if (req.body.content.length > 10000) {
			return res.status(400).json({'error':'Note is too long'});
		}
		if (req.body.name.length < 1) {
			return res.status(400).json({'error':'Need a name'});
		}
		// insert data into db
		db.one('INSERT INTO notes(name, content) VALUES($1, $2) RETURNING id', [req.body.name, req.body.content])
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((e) => {
				console.log(e);
				return res.status(400).json({'error':'Bad request'});
			});
	});

	// PUT /note/:id
	app.put('/note/:id', function(req, res) {
		// error handling
		if (!req.body.name || !req.body.content) {
			return res.status(400).json({'error':'No name or content found'});
		}
		if (req.body.name.length > 50) {
			return res.status(400).json({'error':'Name too long'});
		}
		if (req.body.content.length > 10000) {
			return res.status(400).json({'error':'Note is too long'});
		}
		if (req.body.name.length < 1) {
			return res.status(400).json({'error':'Need a name'});
		}
		// update data from db
		db.none('UPDATE notes SET name = $1, content = $2 WHERE id = $3', [req.body.name, req.body.content, req.params.id])
			.then(() => {
				return res.status(200).json({'success': 'Updated note'});
			})
			.catch((e) => {
				console.log(e);
				return res.status(400).json({'error':'Bad request'});
			});
	});

	// DELETE /note/:id 
	app.delete('/note/:id', function(req, res) {
		// delete from db
		db.result('DELETE FROM notes WHERE id = $1', req.params.id)
			.then((data) => {
				return res.status(200).json({'message': `Removed ${data.rowCount} note`});
			})
			.catch((e) => {
				console.log(e);
				return res.status(400).json({'error':'Bad request'});
			});
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get('*', function(req, res) {
		return res.sendFile(path.join(__dirname, '/client/build/index.html'));
	});
};