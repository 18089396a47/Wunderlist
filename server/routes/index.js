module.exports = function(app) {
	app.get('/', require('./main').get);
	app.post('/', require('./main').post);
	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);
	app.get('/list/:id', require('./list').get);
	app.post('/list/:id', require('./list').post);
	// app.get('/', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../public/login.html'));
	// });

	// app.get('/build/bundle.js', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../public/build/bundle.js'));
	// });

	// app.get('/views/login.view.html', function(req, res) {
	// 	res.sendFile(path.join(__dirname, '../public/views/login.view.html'));
	// });
	// app.get('/', require('./frontpage').get);
	// app.get('/login', require('./login').get);
	// app.post('/login', require('./login').post);
	// app.post('/logout', require('./logout').post);
};