// if ('serviceWorker' in navigator) {
//     // register service worker
//     navigator.serviceWorker.register('/service-worker.js');
// }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', {scope: '/'}
        ).then(registration => {
            // 注册成功
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }).catch(err => {
            // 注册失败
            console.log('ServiceWorker registration failed: ', err)
        })
    })
}
