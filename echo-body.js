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
	.option('-p, --port <port>', 'Port', Number, process.env.PORT || 4000)
	.parse(process.argv);

var CONTENT_TYPES = [
	'json', 'urlencoded', 'text', 'multipart'
];

// Launch echo server.
koa()
	.use(bodyParser({multipart: true}))
	.use(function *() {
		var contentType = CONTENT_TYPES.filter((type) => this.is(type))[0] || '?';
		console.log(chalk.green('Request to %s'), this.request.header.host + this.request.url);
		console.log(chalk.yellow(' - Method: ') + this.request.method);
		console.log(chalk.yellow(' - Content-Type: ') + contentType);
		console.log(chalk.yellow(' - Body: ') + JSON.stringify(this.request.body, null, 2));
		this.status = 200;
	})
	.listen(program.port);

console.log(chalk.black.bgGreen('Echo server listening on port %d.'), program.port);
