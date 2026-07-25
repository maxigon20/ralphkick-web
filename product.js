// ── IMÁGENES ──
const mainImg = document.getElementById('product-main-img');
const lifestyleImgs = Array.from(document.querySelectorAll('.product-lifestyle img'));
const allSrcs = [mainImg.src, ...lifestyleImgs.map(img => img.src)];
let currentIndex = 0;

function setMain(index) {
    currentIndex = (index + allSrcs.length) % allSrcs.length;
    mainImg.src = allSrcs[currentIndex];
}

// Flechas sobre la imagen principal
document.getElementById('prod-prev').addEventListener('click', e => {
    e.stopPropagation();
    setMain(currentIndex - 1);
});
document.getElementById('prod-next').addEventListener('click', e => {
    e.stopPropagation();
    setMain(currentIndex + 1);
});

// Clic en thumbnails de lifestyle
lifestyleImgs.forEach((img, i) => {
    img.addEventListener('click', () => setMain(i + 1));
});

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');

function openLightbox() {
    lightboxImg.src = allSrcs[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNext() {
    currentIndex = (currentIndex + 1) % allSrcs.length;
    lightboxImg.src = allSrcs[currentIndex];
    mainImg.src = allSrcs[currentIndex];
}

function showPrev() {
    currentIndex = (currentIndex - 1 + allSrcs.length) % allSrcs.length;
    lightboxImg.src = allSrcs[currentIndex];
    mainImg.src = allSrcs[currentIndex];
}

mainImg.addEventListener('click', openLightbox);
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); showPrev(); });
document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); showNext(); });

// Teclado
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) {
        const prev = document.body.dataset.prev;
        const next = document.body.dataset.next;
        if (e.key === 'ArrowLeft' && prev) window.location.href = prev;
        if (e.key === 'ArrowRight' && next) window.location.href = next;
        return;
    }
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

// Swipe en lightbox (entre fotos)
let lbTouchX = 0;
lightbox.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
    const diff = lbTouchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) showNext();
    else showPrev();
});

// Swipe en página (entre productos)
let pageTouchX = 0;
document.addEventListener('touchstart', e => {
    if (lightbox.classList.contains('active')) return;
    pageTouchX = e.changedTouches[0].screenX;
}, { passive: true });
document.addEventListener('touchend', e => {
    if (lightbox.classList.contains('active')) return;
    const prev = document.body.dataset.prev;
    const next = document.body.dataset.next;
    const diff = pageTouchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 60) return;
    if (diff > 0 && next) window.location.href = next;
    if (diff < 0 && prev) window.location.href = prev;
});