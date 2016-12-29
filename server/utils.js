'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by texpe on 30/12/2016.
 */

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, [{
        key: 'jsonResponse',
        value: function jsonResponse(res, data) {
            var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

            if (status !== 200) data.success = false;
            res.status(status).json(data).end();
        }
    }, {
        key: 'hasAllFields',
        value: function hasAllFields(haystack, needles) {
            for (var i = 0; i < needles.length; i++) {
                if (!haystack.hasOwnProperty(needles[i])) return false;
            }
            return true;
        }
    }, {
        key: 'randomString',
        value: function randomString() {
            var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 48;

            var allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var v = '';
            for (var i = 0; i < len; i++) {
                v += allowed[Math.floor(Math.random() * allowed.length)];
            }return v;
        }
    }]);

    return Utils;
}();

module.exports = new Utils();