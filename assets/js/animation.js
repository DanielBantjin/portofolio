document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');

    if (typewriter) {
        const text = typewriter.getAttribute('data-text') || '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                typewriter.textContent += text.charAt(index);
                index++;
                setTimeout(type, 70);
            }
        };

        type();
    }

    const revealItems = document.querySelectorAll('.reveal, .about-card, .skill-card, .project-card, .contact-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    revealItems.forEach((item) => {
        item.classList.add('reveal');
        observer.observe(item);
    });
});
