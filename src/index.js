/**
 * Created by chenlin on 2018/6/8.
 */

(function () {
    if (!Date.now){
        Date.now = function now () {
           return new Date().getTime();
        }
    }
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    const len = vendors.length;
    for(let i = 0; i < len; i++) {
        const item = vendors[i];
        window.requestAnimationFrame = window[`${item}RequestAnimationFrame`];
        window.cancelAnimationFrame = window[`${item}CancelAnimationFrame`] ||
            window[`${item}CancelRequestAnimationFrame`];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            const currTime = Date.now();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(function () {
                callback && callback(currTime + lastTime);
            }, timeToCall);
            lastTime  = currTime + timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
})();