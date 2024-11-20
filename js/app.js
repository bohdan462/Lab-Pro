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

/**
 * Highlight the active section and corresponding navbar link
 */
// Observe sections and determine the current visible section
function observeSections() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove active classes
                document.querySelectorAll('section').forEach(section => 
                    section.classList.remove('your-active-class'));
                document.querySelectorAll('.menu__link').forEach(link => 
                    link.classList.remove('active'));

                // Add active classes
                entry.target.classList.add('your-active-class');
                const activeLink = document.querySelector(
                    `.menu__link[href="#${entry.target.id}"]`
                );
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
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


// Event Listeners
navbarList.addEventListener('click', scrollToSection);

/**
 * Initialize the page
 */
buildNavbar();
observeSections();
