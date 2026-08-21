// ── IMÁGENES ──
const mainImg = document.getElementById('product-main-img');
const lifestyleImgs = Array.from(document.querySelectorAll('.product-lifestyle img'));
const allSrcs = [mainImg.getAttribute('src'), ...lifestyleImgs.map(img => img.getAttribute('src'))];
let currentIndex = 0;

function setMain(index) {
    currentIndex = (index + allSrcs.length) % allSrcs.length;
    mainImg.src = allSrcs[currentIndex];
}

document.getElementById('prod-prev').addEventListener('click', e => {
    e.stopPropagation();
    setMain(currentIndex - 1);
});

document.getElementById('prod-next').addEventListener('click', e => {
    e.stopPropagation();
    setMain(currentIndex + 1);
});

lifestyleImgs.forEach((img, i) => {
    img.addEventListener('click', () => setMain(i + 1));
});

// ── TALLAS INTERACTIVAS ──
const sizeSpans = document.querySelectorAll('.size-grid:not(.size-grid--soldout) span');
sizeSpans.forEach(span => {
    span.addEventListener('click', () => {
        sizeSpans.forEach(s => s.classList.remove('selected'));
        span.classList.add('selected');
    });
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

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

// Swipe en lightbox
let lbTouchX = 0;
lightbox.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
    const diff = lbTouchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) showNext();
    else showPrev();
});

// Swipe en página (entre fotos del producto)
let pageTouchX = 0;
let pageTouchY = 0;
document.addEventListener('touchstart', e => {
    if (lightbox.classList.contains('active')) return;
    pageTouchX = e.changedTouches[0].screenX;
    pageTouchY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    if (lightbox.classList.contains('active')) return;
    const diffX = pageTouchX - e.changedTouches[0].screenX;
    const diffY = pageTouchY - e.changedTouches[0].screenY;
    if (Math.abs(diffX) < 60) return;
    if (Math.abs(diffY) > Math.abs(diffX)) return;
    if (diffX > 0) showNext();
    else showPrev();
});