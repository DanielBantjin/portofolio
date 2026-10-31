document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('.reveal');
    const toggleButton = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    const projectsList = document.querySelector('.projects-list');
    const projectArrows = document.querySelectorAll('.projects-arrow');

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
            const isOpen = navMenu.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
            toggleButton.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        });

        document.querySelectorAll('.navbar-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.setAttribute('aria-label', 'Buka menu navigasi');
            });
        });
    }

    if (projectsList && projectArrows.length) {
        const updateProjectArrows = () => {
            const atStart = projectsList.scrollLeft <= 4;
            const atEnd = projectsList.scrollLeft + projectsList.clientWidth >= projectsList.scrollWidth - 4;

            projectArrows.forEach((arrow) => {
                const direction = Number(arrow.dataset.projectScroll);
                arrow.disabled = direction < 0 ? atStart : atEnd;
            });
        };

        projectArrows.forEach((arrow) => {
            arrow.addEventListener('click', () => {
                const card = projectsList.querySelector('.project-card');
                if (!card) return;

                const styles = getComputedStyle(projectsList);
                const gap = parseFloat(styles.columnGap) || 0;
                const direction = Number(arrow.dataset.projectScroll);

                projectsList.scrollBy({
                    left: direction * (card.getBoundingClientRect().width + gap),
                    behavior: 'smooth'
                });
            });
        });

        projectsList.addEventListener('scroll', updateProjectArrows, { passive: true });
        window.addEventListener('resize', updateProjectArrows);
        updateProjectArrows();
    }
});
