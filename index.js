import Utils from './Lib/utils';

const crypto = require('crypto');
const utils = new Utils();

exports.handler = function(event, context, callback) {
    const buffer = (new Buffer(event.body), 'utf8');
    const calculated_hash = crypto.createHmac('sha256', process.env.shopifySecret).update(buffer).digest('base64');

    if (!event.headers || event.headers['X-Shopify-Hmac-Sha256'] !== calculated_hash) {
        callback(null, utils.formatResultBody(403, 'Forbidden'));
    } else {
        callback(null, utils.formatResultBody(200, 'Ok'));
    }
}