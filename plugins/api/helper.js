import config from './config.js'
export default (url) => 'http://' + config.ip.toString() + '/api/' + config.username.toString() + url