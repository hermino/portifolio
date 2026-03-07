/**
 * Theme Toggle Logic
 * Manages light/dark theme switching with localStorage persistence
 */

(function() {
    'use strict';
    
    // Get theme from localStorage or system preference
    function getInitialTheme() {
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme) {
            return storedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update aria-label for accessibility
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
            themeToggle.setAttribute('aria-label', label);
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add changing class for animation
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.classList.add('changing');
            setTimeout(() => {
                themeToggle.classList.remove('changing');
            }, 300);
        }
        
        applyTheme(newTheme);
    }
    
    // Initialize theme on page load
    function initTheme() {
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);
        
        // Add event listener to toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            
            // Keyboard support
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
