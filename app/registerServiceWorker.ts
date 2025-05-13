// Registra o service worker para o PWA
export default function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          // Service worker registrado
        })
        .catch(err => {
          // Falha ao registrar
          console.error('SW registration failed:', err)
        })
    })
  }
}
