if(navigator.serviceWorker){
    navigator.serviceWorker.register('/js/sw.js')
    .then(() => {
        console.log("registered")
    })
    .catch((err) => {
        console.log(err);
    })
}