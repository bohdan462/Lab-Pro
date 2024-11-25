/**
 * @description Global variables for navigation elements
 */
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * @description Builds navigation menu dynamically from sections
 * @returns {void}
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
 * @description Handles smooth scrolling to sections when clicking navigation items
 * @param {Event} event - Click event object
 * @returns {void}
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
 * @description Observes sections for viewport visibility and updates active states
 * @returns {void}
 */
function observeSections() {
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0.2, 0.5, 0.8]
    };

    const observer = new IntersectionObserver((entries) => {
        // Sort entries by intersection ratio
        entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = entries.find(entry => entry.isIntersecting);
        
        if (mostVisible) {
            updateActiveStates(mostVisible.target);
        }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        section.style.transition = 'all 0.5s ease';
    });
}

/**
 * @description Updates active states for sections and navigation items
 * @param {HTMLElement} activeSection - The currently active section
 * @returns {void}
 */
function updateActiveStates(activeSection) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('your-active-class');
        section.style.opacity = '0.7';
        section.style.transform = 'translateX(-20px)';
    });

    document.querySelectorAll('.menu__link').forEach(link => {
        link.classList.remove('active');
    });

    activeSection.classList.add('your-active-class');
    activeSection.style.opacity = '1';
    activeSection.style.transform = 'translateX(0)';

    const activeLink = document.querySelector(
        `.menu__link[href="#${activeSection.id}"]`
    );
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * @description Handles mobile menu functionality
 * @returns {void}
 */
function handleMobileMenu() {
    const toggle = document.querySelector('.toggle-menu');
    const floatingIcon = document.querySelector('.floating-nav-icon');
    const navbar = document.querySelector('.navbar__menu');

    function closeMenu() {
        navbar.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        if (floatingIcon) floatingIcon.classList.remove('active');
    }

    // Toggle menu with the toggle button
    if (toggle) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    // Toggle menu with the floating icon
    if (floatingIcon) {
        floatingIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            floatingIcon.classList.toggle('active');
        });
    }

    // Close menu when clicking outside or on a menu link
    document.addEventListener('click', (event) => {
        if (
            (!navbar.contains(event.target) && !toggle.contains(event.target) && !floatingIcon.contains(event.target)) ||
            event.target.classList.contains('menu__link')
        ) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildNavbar();
    observeSections();
    navbarList.addEventListener('click', scrollToSection);
    handleMobileMenu();
});
