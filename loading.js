// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('ServiceWorker registered'))
        .catch(err => console.log('ServiceWorker registration failed:', err));
}

// Redirect to home page after loading
setTimeout(() => {
    window.location.href = 'home.html';
}, 3000);