const revealLink = document.getElementById('reveal-link');
const form = document.getElementById('signup-form');
const message = document.getElementById('form-message');

// Dinamismo: Oculta el enlace y muestra el input de email con suavidad
revealLink.addEventListener('click', (e) => {
    e.preventDefault();
    revealLink.style.display = 'none';
    form.classList.remove('hidden');
    document.getElementById('email').focus();
});

// En el siguiente paso crearemos este enlace GRATIS
const FORM_ENDPOINT = 'https://formspree.io/f/mdarnnbq';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = 'Saving your email...';
    form.style.opacity = '0.5';

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            message.textContent = 'Thanks for rocking RalphKick!';
            form.reset();
            form.style.display = 'none';
        } else {
            message.textContent = 'Something went wrong, please try again.';
            form.style.opacity = '1';
        }
    } catch (error) {
        message.textContent = 'Something went wrong, please try again.';
        form.style.opacity = '1';
    }
});