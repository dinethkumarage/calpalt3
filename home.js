// PWA Installation
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const laterBtn = document.getElementById('laterBtn');
const installSteps = document.getElementById('installSteps');

// Handle subscription
document.getElementById('subscribeBtn').addEventListener('click', () => {
    window.location.href = 'https://payoneer.com';
});

// Check if already installed
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
    installBanner.style.display = 'none';
}

// Handle install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show banner after slight delay
    setTimeout(() => {
        installBanner.style.display = 'block';
        installBanner.style.animation = 'slideUp 0.3s ease-out';
    }, 2000);
});

// Install button click handler
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBanner.style.display = 'none';
        }
        deferredPrompt = null;
    } else {
        // Show iOS instructions
        installSteps.style.display = 'block';
        installBtn.style.display = 'none';
    }
});

// Later button click handler
laterBtn.addEventListener('click', () => {
    installBanner.style.display = 'none';
    // Save dismissal to localStorage
    localStorage.setItem('installPromptDismissed', Date.now());
});

// Check if we should show prompt based on last dismissal
const lastDismissed = localStorage.getItem('installPromptDismissed');
if (lastDismissed) {
    const daysSinceDismissed = (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissed < 7) {
        installBanner.style.display = 'none';
    }
}

// Bottom navigation handling
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Add button click effect
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
    // Add your food entry logic here
    console.log('Add new food entry');
});

// Handle standalone mode
if (window.navigator.standalone) {
    document.body.classList.add('standalone');
}

// Register service worker if not already registered
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registered');
        })
        .catch(err => {
            console.error('ServiceWorker registration failed:', err);
        });
}