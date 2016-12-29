/**
 * Created by texpe on 30/12/2016.
 */

class User {
    static Login(user, password, callback) {
        user.comparePassword(password, (err, isMatch) => {
            if(err) {
                if(callback) callback({ success: false, error: err });
                return;
            }
            if(callback) {
                if(isMatch) callback({ success: true, user: this });
                else callback({ success: false, error: 'Incorrect Username/Password' });
            }
        });
    }
}

module.exports = User;