"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("winston");
const fs = require("mz/fs");
const moment = require("moment");
const long = require("long");
const api_1 = require("./helpers/api");
const walker_1 = require("./helpers/walker");
const pogobuf = require("../pogobuf");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    'timestamp': function () {
        return moment().format('HH:mm:ss');
    },
    'colorize': true,
    'level': 'debug',
});
let config = require('./helpers/config').load();
let state = JSON.parse(fs.readFileSync('data/state.json', 'utf8'));
let apihelper = new api_1.default(config, state);
let walker = new walker_1.default(config, state);
function testVersion(version) {
    logger.info('Version', version);
    logger.info('Client Version', apihelper.versionToClientVersion(version));
    logger.info('iOS Version', apihelper.versionToiOSVersion(version));
}
function testRequestIds() {
    let client = new pogobuf.Client();
    for (let i = 0; i < 10; i++) {
        let id = client.getRequestID();
        logger.info('%s', id.toString(16));
    }
}
function testUK25() {
    let uk25 = long.fromString('11fdf018c941ef22', false, 16);
    console.log(uk25.toString());
}
testUK25();
//# sourceMappingURL=debug.js.map