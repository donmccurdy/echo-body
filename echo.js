var koa = require('koa'),
	bodyParser = require('koa-body'),
	program = require('commander'),
	chalk = require('chalk');

// Bind CLI interface.
program
	.version('1.0.0')
	.description('Listens on specified port and echos request bodies.')
	.option('-p, --port', 'Port')
	.parse(process.argv);

// Default to port 4000.
program.port = program.port || 4000;

// Launch echo server.
koa()
	.use(bodyParser({multipart: true}))
	.use(function *() {
		console.log(chalk.green('Request from %s'), this.request.header.host);
		console.log(chalk.yellow(' - URL: ') + this.request.url);
		console.log(chalk.yellow(' - Method: ') + this.request.method);
		console.log(chalk.yellow(' - Body: ') + JSON.stringify(this.request.body, null, 2));
		this.status = 200;
	})
	.listen(program.port);

console.log(chalk.black.bgGreen('Echo server listening on port %d.'), program.port);
