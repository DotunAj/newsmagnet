"use strict";

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/js/sw.js').then(function () {
        console.log("registered");
    }).catch(function (err) {
        console.log(err);
    });
}
//# sourceMappingURL=main.js.map
