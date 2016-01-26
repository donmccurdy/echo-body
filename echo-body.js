#!/usr/bin/env node

var pkg = require('./package.json'),
	koa = require('koa'),
	bodyParser = require('koa-body'),
	program = require('commander'),
	chalk = require('chalk');

// Bind CLI interface.
program
	.version(pkg.version)
	.description(pkg.description)
	.option('-p, --port', 'Port', Number)
	.parse(process.argv);

// Default to port 4000.
program.port = program.port || process.env.PORT || 4000;

// Launch echo server.
koa()
	.use(bodyParser({multipart: true}))
	.use(function *() {
		console.log(chalk.green('Request to %s'), this.request.header.host + this.request.url);
		console.log(chalk.yellow(' - Method: ') + this.request.method);
		console.log(chalk.yellow(' - Body: ') + JSON.stringify(this.request.body, null, 2));
		this.status = 200;
	})
	.listen(program.port);

console.log(chalk.black.bgGreen('Echo server listening on port %d.'), program.port);
