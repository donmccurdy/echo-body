#!/usr/bin/env node

var pkg = require('./package.json'),
	koa = require('koa'),
	bodyParser = require('koa-body'),
	buddy = require('co-body'),
	program = require('commander'),
	chalk = require('chalk');

// Bind CLI interface.
program
	.version(pkg.version)
	.description(pkg.description)
	.option('-p, --port <port>', 'Port', Number, process.env.PORT || 4000)
	.parse(process.argv);

// Launch echo server.
koa()
//	.use(bodyParser({multipart: true}))
	.use(function *() {
		console.log(chalk.green('Request to %s'), this.request.header.host + this.request.url);
		console.log(chalk.yellow(' - Method: ') + this.request.method);
		var body = yield buddy.text(this, {encoding: 'utf-8', limit: '56kb'});
		console.log(chalk.yellow(' - Body: ') + body);
		this.status = 200;
	})
	.listen(program.port);

console.log(chalk.black.bgGreen('Echo server listening on port %d.'), program.port);
