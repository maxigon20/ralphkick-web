// ── LIGHTBOX ──
const triggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');

triggers.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ── NAVEGACIÓN ENTRE PRODUCTOS (swipe + teclado) ──
const prev = document.body.dataset.prev;
const next = document.body.dataset.next;

// Teclado (← →)
document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        return;
    }
    if (e.key === 'ArrowLeft' && prev) window.location.href = prev;
    if (e.key === 'ArrowRight' && next) window.location.href = next;
});

// Swipe móvil
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    if (lightbox.classList.contains('active')) return;
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 60) return;
    if (diff > 0 && next) window.location.href = next;
    if (diff < 0 && prev) window.location.href = prev;
});