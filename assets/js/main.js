document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('.reveal');
    const toggleButton = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', navMenu.classList.contains('is-open'));
        });

        document.querySelectorAll('.navbar-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
