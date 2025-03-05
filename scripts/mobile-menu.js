// Load and initialize navbar
async function loadNavbar() {
    try {
        // Fetch navbar content
        const response = await fetch('./nav.html');
        if (!response.ok) throw new Error('Failed to load navbar');
        const html = await response.text();
        
        // Insert navbar into container
        const navContainer = document.createElement('div');
        navContainer.id = 'navbar-container';
        navContainer.innerHTML = html;
        document.body.insertBefore(navContainer, document.body.firstChild);
        
        // Initialize mobile menu
        initMobileMenu();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    
    if (mobileMenuButton && mobileNavMenu) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileNavMenu.classList.toggle('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            if (!isExpanded) {
                mobileMenuClose.focus();
            }
        });

        // Close mobile menu
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuButton.focus();
        });

        // Close menu when clicking outside
        mobileNavMenu.addEventListener('click', function(e) {
            if (e.target === mobileNavMenu) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileNavMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuButton.focus();
            }
        });

        // Close menu when clicking a link
        mobileNavMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileNavMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (mobileNavMenu.classList.contains('active')) {
                // Close on Escape
                if (e.key === 'Escape') {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileNavMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuButton.focus();
                }
                
                // Trap focus within menu
                if (e.key === 'Tab') {
                    const focusableElements = mobileNavMenu.querySelectorAll(
                        'a, button, [href], [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);
