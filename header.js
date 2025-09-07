// Header functionality
class SiteHeader {
    constructor() {
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Set up mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Set active page
        this.setActivePage();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    setActivePage() {
        // Get current page name from URL
        const currentPage = this.getCurrentPageName();
        
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page link
        const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        // Handle different page scenarios
        if (page === '' || page === 'index.html') return 'index';
        if (page === 'photo.html') return 'photo';
        if (page === 'about.html') return 'about';
        if (page === 'contact.html') return 'contact';
        
        return 'index'; // Default fallback
    }
}

// Function to load header into pages
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        
        // Initialize header functionality after loading
        new SiteHeader();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadHeader);