const CACHE_NAME = 'pulse-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Ascolta il comando dall'app per attivare il controllo
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        checkAndNotify();
    }
});

function checkAndNotify() {
    // Controllo ogni 30 minuti
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // Se sono le 10:00 (e non abbiamo già mandato una notifica nell'ultima ora)
        if (hours === 10 && minutes < 31) {
            self.registration.showNotification('PULSE 28', {
                body: 'È ora del tuo esercizio quotidiano! ⚡',
                icon: 'icon.png',
                badge: 'icon.png',
                vibrate: [200, 100, 200]
            });
        }
    }, 1800000); 
}

// Gestione del click sulla notifica
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
