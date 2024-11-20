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

    console.log('Navbar built:', navbarList); // Debugging
}

/**
 * Highlight the active section and corresponding navbar link
 */
// Observe sections and determine the current visible section
function observeSections() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove active class from all sections and links
                document.querySelectorAll('section').forEach((section) => {
                    section.classList.remove('your-active-class');
                });
                document.querySelectorAll('.menu__link').forEach((link) => {
                    link.classList.remove('active');
                });

                // Add active class to the currently visible section
                entry.target.classList.add('your-active-class');

                // Highlight the corresponding navbar link
                const activeLink = document.querySelector(
                    `.menu__link[href="#${entry.target.id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });
}

/**
 * Smooth scrolling to sections
 */
navbarList.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__link')) {
        event.preventDefault();

        const sectionID = event.target.getAttribute('href').slice(1);
        const section = document.getElementById(sectionID);

        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error(`Section not found: ${sectionID}`); // Debugging
        }
    }
});

/**
 * Initialize the page
 */
buildNavbar();
observeSections();
