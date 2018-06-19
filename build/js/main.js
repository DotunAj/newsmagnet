'use strict';

if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').catch(function (err) {
            console.log(err);
        });
    });
}
//# sourceMappingURL=main.js.map
