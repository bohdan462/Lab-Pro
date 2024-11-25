/**
 * Define Global Variables
 */
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * Build the navigation menu dynamically based on sections
 */
function buildNavbar() {
    const fragment = document.createDocumentFragment();

    sections.forEach((section) => {
        const navText = section.getAttribute('data-nav');
        const sectionID = section.getAttribute('id');

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = navText;
        link.className = 'menu__link';
        link.href = `#${sectionID}`;

        listItem.appendChild(link);
        fragment.appendChild(listItem);
    });

    navbarList.appendChild(fragment);
}

function observeSections() {
    const observerOptions = {
        root: null,
        // Adjust rootMargin to start detecting earlier
        rootMargin: '-10% 0px -10% 0px',
        // Lower threshold to catch sections earlier
        threshold: [0.2, 0.5, 0.8]
    };

    const observer = new IntersectionObserver((entries) => {
        // Sort entries by visibility ratio to handle overlapping sections
        entries.sort((a, b) => {
            return b.intersectionRatio - a.intersectionRatio;
        });

        // Get the most visible section
        const mostVisible = entries.find(entry => entry.isIntersecting);
        
        if (mostVisible) {
            // Remove active classes from all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('your-active-class');
                section.style.opacity = '0.7';
                section.style.transform = 'translateX(-20px)';
            });

            // Remove active classes from all links
            document.querySelectorAll('.menu__link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active classes to current section
            mostVisible.target.classList.add('your-active-class');
            mostVisible.target.style.opacity = '1';
            mostVisible.target.style.transform = 'translateX(0)';

            // Update navigation
            const activeLink = document.querySelector(
                `.menu__link[href="#${mostVisible.target.id}"]`
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Animate content
            const content = mostVisible.target.querySelector('.landing__container');
            if (content) {
                content.style.transform = 'translateX(0)';
                content.style.opacity = '1';
            }
        }
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
        // Initialize styles
        section.style.transition = 'all 0.5s ease';
    });
}

/**
 * Smooth scrolling to sections
 */
function scrollToSection(event) {
    if (event.target.classList.contains('menu__link')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                behavior: 'smooth',
                top: targetSection.offsetTop - 60
            });
        }
    }
}

/**
 * Mobile menu handling
 */
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.toggle-menu');
    const navbar = document.querySelector('.navbar__menu');

    function closeMenu() {
        navbar.classList.remove('active');
        toggle.classList.remove('active');
    }

    // Toggle menu
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu on any click outside or on menu links
    document.addEventListener('click', (event) => {
        if ((!navbar.contains(event.target) && !toggle.contains(event.target)) || 
            event.target.classList.contains('menu__link')) {
            closeMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const floatingIcon = document.querySelector('.floating-nav-icon');
    const navbar = document.querySelector('.navbar__menu');
    
    floatingIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!floatingIcon.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove('active');
        }
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.menu__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
});


// Event Listeners
navbarList.addEventListener('click', scrollToSection);

/**
 * Initialize the page
 */
buildNavbar();
observeSections();
