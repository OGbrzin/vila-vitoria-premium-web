/**
 * Pet Shop Vila Vitória - Main JavaScript File
 * Handles UI interactions, Intersection Observer animations, and accessible keyboard navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Smart Header Logic (Sticky + Glassmorphism)
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-glass');
            header.classList.remove('py-4', 'border-transparent');
            header.classList.add('py-2', 'border-gray-200');
        } else {
            header.classList.remove('header-glass');
            header.classList.add('py-4', 'border-transparent');
            header.classList.remove('py-2', 'border-gray-200');
        }
    };

    // Initial check on load
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle ARIA attributes
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen.toString());
        mobileMenu.setAttribute('aria-hidden', (!isMenuOpen).toString());
        
        if (isMenuOpen) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            // Change Icon to Close
            mobileMenuBtn.innerHTML = '<i data-lucide="x" stroke-width="1.5"></i>';
            lucide.createIcons();
        } else {
            // Hide menu
            mobileMenu.classList.add('hidden');
            // Change Icon to Menu
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" stroke-width="1.5"></i>';
            lucide.createIcons();
        }
    };

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Close menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const setupRevealAnimations = () => {
        // Elements to animate
        const revealElements = document.querySelectorAll('[data-animate]');
        
        if (!revealElements.length) return;

        const revealOptions = {
            root: null, // viewport
            rootMargin: '0px 0px -100px 0px', // trigger slightly before bottom
            threshold: 0.1 // 10% visible
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Add visibility class
                    el.classList.add('is-visible');
                    
                    // Optional: retrieve stagger delay
                    const delay = el.getAttribute('data-stagger');
                    if (delay) el.style.transitionDelay = `${delay}ms`;
                    
                    // Unobserve to only animate once
                    observer.unobserve(el);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            // Add base reveal class and specific animation type
            const animType = el.getAttribute('data-animate') || 'fade-up';
            el.classList.add('reveal', animType);
            revealObserver.observe(el);
        });
    };

    setupRevealAnimations();
    
    // 5. FAQ Accordion Logic (Optional helper fn, if we use it dynamically)
    const setupFaqAccordions = () => {
        const faqButtons = document.querySelectorAll('.faq-button');
        
        faqButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                
                // Toggle current
                btn.setAttribute('aria-expanded', !isExpanded);
                item.classList.toggle('active');
            });
        });
    }
    
    // Run setup (will run on elements if they exist)
    setupFaqAccordions();
});
