'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by texpe on 30/12/2016.
 */

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, null, [{
        key: 'Login',
        value: function Login(user, password, callback) {
            var _this = this;

            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    if (callback) callback({ success: false, error: err });
                    return;
                }
                if (callback) {
                    if (isMatch) callback({ success: true, user: _this });else callback({ success: false, error: 'Incorrect Username/Password' });
                }
            });
        }
    }]);

    return User;
}();

module.exports = User;