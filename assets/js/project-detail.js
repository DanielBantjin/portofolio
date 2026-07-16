document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('.image-carousel').forEach((carousel) => {
        const imageSources = (carousel.dataset.carouselImages || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);

        if (imageSources.length === 0) {
            return;
        }

        const viewport = document.createElement('div');
        viewport.className = 'carousel-viewport';

        const track = document.createElement('div');
        track.className = 'carousel-track';

        const controls = document.createElement('div');
        controls.className = 'carousel-controls';

        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-btn';
        prevButton.type = 'button';
        prevButton.setAttribute('aria-label', 'Previous image');
        prevButton.innerHTML = '←';

        const counter = document.createElement('span');
        counter.className = 'carousel-counter';

        const dots = document.createElement('div');
        dots.className = 'carousel-dots';

        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-btn';
        nextButton.type = 'button';
        nextButton.setAttribute('aria-label', 'Next image');
        nextButton.innerHTML = '→';

        imageSources.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';

            const image = document.createElement('img');
            image.src = src;
            image.alt = `Project screenshot ${index + 1}`;
            image.loading = 'lazy';

            slide.appendChild(image);
            track.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            dot.addEventListener('click', () => {
                activeIndex = index;
                render();
            });
            dots.appendChild(dot);
        });

        let activeIndex = 0;

        const render = () => {
            track.style.transform = `translateX(-${activeIndex * 100}%)`;
            counter.textContent = `${activeIndex + 1} / ${imageSources.length}`;
            Array.from(dots.children).forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        };

        prevButton.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + imageSources.length) % imageSources.length;
            render();
        });

        nextButton.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % imageSources.length;
            render();
        });

        viewport.appendChild(track);
        controls.appendChild(prevButton);
        controls.appendChild(dots);
        controls.appendChild(counter);
        controls.appendChild(nextButton);
        carousel.innerHTML = '';
        carousel.appendChild(viewport);
        carousel.appendChild(controls);
        render();
    });
});
