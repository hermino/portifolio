/**
 * Scroll Animations with Intersection Observer
 * Adds animation classes to elements when they enter the viewport
 */

(function() {
    'use strict';
    
    // Configuration for Intersection Observer
    const observerOptions = {
        threshold: 0.1,              // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px'  // Trigger 100px before element enters viewport
    };
    
    // Callback function when elements intersect
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate-in class when element enters viewport
                entry.target.classList.add('animate-in');
                
                // Stop observing this element (animate only once)
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Initialize animations
    function initScrollAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // If user prefers reduced motion, don't animate
            return;
        }
        
        // Select all elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.project, .experience, .timeline-item, .skill'
        );
        
        // Add animate-on-scroll class and observe each element
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
        
        // Optional: Observe about section
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.classList.add('fade-in');
            observer.observe(aboutSection);
        }
        
        // Optional: Observe headings
        const mainHeadings = document.querySelectorAll('main h2');
        mainHeadings.forEach(heading => {
            heading.classList.add('slide-in-left');
            observer.observe(heading);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
    
    // Re-initialize if user changes motion preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (!e.matches) {
                // User changed to allow motion, reinitialize
                initScrollAnimations();
            }
        });
    }
})();
