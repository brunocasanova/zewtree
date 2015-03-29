#!/bin/env node

var express = require( 'express' );
var fs = require('fs');

var SampleApp = function() {

/**
 *  DEFINE
 */

    var self = this;

    self.setupVariables = function() {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if ( typeof self.ipaddress === 'undefined' ) {
            console.warn( 'No OPENSHIFT_NODEJS_IP var, using 127.0.0.1' );
            self.ipaddress = "127.0.0.1";
        };
    };

    self.populateCache = function() {
        if (typeof self.zcache === 'undefined') {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };

    self.cache_get = function( key ) { return self.zcache[key]; };

    self.terminator = function( sig ){
        if ( typeof sig === 'string' ){
           console.log('%s: Received %s - terminating sample app ...', Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    self.setupTerminationHandlers = function(){
        process.on('exit', function() { self.terminator(); });

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function ( element, index, array ){
            process.on(element, function() { self.terminator(element); });
        });
    };

/**
 *  APP
 */

    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };

    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };

    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };

    self.start = function() {

        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), self.ipaddress, self.port );
        });
    };

};


/**
 *  MAIN
 */

var zapp = new SampleApp();

zapp.initialize();
zapp.start();

