
 // Lightweight automatic swiper implementation (replaces external Swiper usage)
     document.addEventListener('DOMContentLoaded', function () {
            const container = document.querySelector('.my-swiper');
                if (!container) return;

                const wrapper = container.querySelector('.swiper-wrapper');
                const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
                const paginationEl = container.querySelector('.swiper-pagination');
                const prevBtn = container.querySelector('.swiper-button-prev');
                const nextBtn = container.querySelector('.swiper-button-next');

                let current = 0;
                const delay = 3000; // autoplay delay in ms
                let autoplayId = null;

                // Initialize slides for accessibility and visibility
                slides.forEach((s, i) => {
                    s.setAttribute('role', 'group');
                    s.setAttribute('aria-roledescription', 'slide');
                    s.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
                    s.style.display = i === 0 ? 'block' : 'none';
                    s.classList.toggle('active', i === 0);
                });

                // Build pagination bullets (if pagination container exists)
                if (paginationEl) {
                    paginationEl.innerHTML = '';
                    slides.forEach((_, i) => {
                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = 'bullet' + (i === 0 ? ' active' : '');
                        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
                        btn.addEventListener('click', () => goToSlide(i, true));
                        paginationEl.appendChild(btn);
                    });
                }

                function update() {
                    slides.forEach((s, i) => {
                        const active = i === current;
                        s.style.display = active ? 'block' : 'none';
                        s.classList.toggle('active', active);
                    });
                    if (paginationEl) {
                        Array.from(paginationEl.children).forEach((b, i) => b.classList.toggle('active', i === current));
                    }
                    container.setAttribute('aria-live', 'polite');
                }

                function goToSlide(index, userInteraction = false) {
                    current = (index + slides.length) % slides.length;
                    update();
                    if (userInteraction) resetAutoplay();
                }

                function next() { goToSlide(current + 1, true); }
                function prev() { goToSlide(current - 1, true); }

                if (nextBtn) nextBtn.addEventListener('click', next);
                if (prevBtn) prevBtn.addEventListener('click', prev);

                // Autoplay control
                function startAutoplay() {
                    if (autoplayId) return;
                    autoplayId = setInterval(() => {
                        current = (current + 1) % slides.length;
                        update();
                    }, delay);
                }

                function stopAutoplay() {
                    if (autoplayId) {
                        clearInterval(autoplayId);
                        autoplayId = null;
                    }
                }

                function resetAutoplay() {
                    stopAutoplay();
                    startAutoplay();
                }


                // Kick things off
                update();
                startAutoplay();
            });
        