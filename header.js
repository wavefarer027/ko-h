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
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
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

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-header')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.classList.remove('active');
            this.navMenu.classList.remove('active');
        }
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
        
        // Handle pages without .html extension
        const pageName = page.replace('.html', '');
        return pageName || 'index'; // Default fallback
    }
}

// Function to load header into pages
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const headerHTML = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;
            
            // Initialize header functionality after loading
            new SiteHeader();
        } else {
            console.warn('Header placeholder not found. Make sure you have <div id="header-placeholder"></div> in your HTML.');
        }
    } catch (error) {
        console.error('Error loading header:', error);
        // Fallback: you could create a basic header here if needed
    }
}

// Alternative method: Include header directly (if you prefer not to use fetch)
/* FIXME: Uncomment to use direct insertion fallback
function insertHeaderDirectly() {
    const headerHTML = `
        <header class="site-header" id="site-header">
            <div class="header-container">
                <a href="index.html" class="logo">Ko H.</a>
                
                <nav>
                    <ul class="nav-menu" id="nav-menu">
                        <li><a href="index.html" class="nav-link" data-page="index">Home</a></li>
                        <li><a href="photo.html" class="nav-link" data-page="photo">Gallery</a></li>
                        <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
                        <li><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
                    </ul>
                </nav>

                <div class="mobile-toggle" id="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    `;
    
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        new SiteHeader();
    }
}
*/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Try to load header from file first, fallback to direct insertion
    loadHeader().catch(() => {
        console.log('Falling back to direct header insertion');
        // FIXME: uncomment to use direct insertion fallback
        // insertHeaderDirectly();
    });
});

// Export for use in other files
if (typeof window !== 'undefined') {
    window.SiteHeader = SiteHeader;
    window.loadHeader = loadHeader;
}