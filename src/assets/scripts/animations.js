/**
 * Terminal Modernism - Scroll-triggered Animations
 * Kinetic entrance effects for portfolio sections
 */

(function() {
    'use strict';

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Initialize animations on DOM ready
    function initAnimations() {
        // Animate sections
        const sections = document.querySelectorAll('.about, .projects, .experiences, .skills, .contacts');
        sections.forEach(section => {
            section.classList.add('fade-in-up');
            observer.observe(section);
        });

        // Animate individual items
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            project.classList.add('stagger-item', 'slide-in-left');
            if (index % 2 === 0) {
                project.classList.add('slide-in-right');
                project.classList.remove('slide-in-left');
            }
        });

        const experiences = document.querySelectorAll('.experience');
        experiences.forEach(exp => {
            exp.classList.add('stagger-item', 'slide-in-left');
        });

        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.classList.add('stagger-item', 'fade-in-left');
        });

        // Tech badges - don't animate, keep them visible
        // Removed animation to ensure badges are always visible

        // Contact items
        const contactItems = document.querySelectorAll('.contacts li');
        contactItems.forEach(item => {
            item.classList.add('stagger-item', 'slide-in-right');
        });
    }

    // Parallax effect on scroll
    function initParallax() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;

                    // Parallax on header
                    const header = document.querySelector('header');
                    if (header) {
                        header.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }

                    // Parallax on main diagonal line
                    const mainLine = document.querySelector('main::before');
                    if (mainLine) {
                        const offset = scrolled * 0.1;
                        document.documentElement.style.setProperty('--scroll-offset', `${offset}px`);
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // Mouse move effect for subtle interactivity
    function initMouseEffects() {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });

        function animate() {
            // Smooth lerp
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            // Apply to accent elements
            const accentElements = document.querySelectorAll('h2::before');
            accentElements.forEach(el => {
                if (el) {
                    const offsetX = currentX * 10;
                    const offsetY = currentY * 10;
                    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Initialize all animations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAnimations();
            initParallax();
            initMouseEffects();
        });
    } else {
        initAnimations();
        initParallax();
        initMouseEffects();
    }
})();
