/**
 * Created by texpe on 30/12/2016.
 */

class Utils {
    jsonResponse(res, data, status = 200) {
        if(status !== 200) data.success = false;
        res.status(status).json(data).end();
    }

    hasAllFields(haystack, needles) {
        for(let i = 0; i < needles.length; i++) {
            if (!haystack.hasOwnProperty(needles[ i ]))
                return false;
        }
        return true;
    }

    randomString(len = 48) {
        const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let v = '';
        for(let i = 0; i < len; i++)
            v += allowed[Math.floor(Math.random() * allowed.length)];
        return v;
    }
}

module.exports = new Utils();