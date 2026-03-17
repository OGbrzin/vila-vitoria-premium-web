/**
 * Pet Shop Vila Vitória - Main JavaScript
 * Handles: Header scroll, mobile menu, scroll animations, FAQ accordion.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // ---------------------------------------------------------------
    // 2. Smart Header (Glassmorphism after 50px scroll)
    // ---------------------------------------------------------------
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-glass');
        } else {
            header.classList.remove('header-glass');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---------------------------------------------------------------
    // 3. Mobile Navigation Toggle
    // ---------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenuBtn.setAttribute('aria-expanded', String(isMenuOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isMenuOpen));
            mobileMenu.classList.toggle('hidden', !isMenuOpen);

            // Toggle icon
            mobileMenuBtn.innerHTML = isMenuOpen
                ? '<i data-lucide="x" stroke-width="1.5" class="w-6 h-6"></i>'
                : '<i data-lucide="menu" stroke-width="1.5" class="w-6 h-6"></i>';
            lucide.createIcons();
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" stroke-width="1.5" class="w-6 h-6"></i>';
                lucide.createIcons();
            });
        });
    }

    // ---------------------------------------------------------------
    // 4. Scroll Reveal (Intersection Observer)
    // ---------------------------------------------------------------
    const revealElements = document.querySelectorAll('[data-animate]');

    if (revealElements.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const delay = el.getAttribute('data-stagger') || '0';

                el.style.transitionDelay = `${delay}ms`;
                el.classList.add('is-visible');
                obs.unobserve(el);
            });
        }, {
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => {
            const animType = el.getAttribute('data-animate') || 'fade-up';
            el.classList.add('reveal', animType);
            observer.observe(el);
        });
    }

    // ---------------------------------------------------------------
    // 5. FAQ Accordion
    // ---------------------------------------------------------------
    document.querySelectorAll('.faq-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Collapse all others
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-button')?.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            btn.setAttribute('aria-expanded', String(!isExpanded));
            item.classList.toggle('active');
        });
    });

});
