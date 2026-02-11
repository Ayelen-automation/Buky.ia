// ===================================
// BUKY.IA - Landing Page JavaScript
// Conversion-focused functionality
// ===================================

// === DOM Elements ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// === Hamburger Menu Toggle ===
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
        const isActive = navMenu.classList.contains('active');

        // Toggle active class
        if (isActive) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        } else {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === FAQ Accordion Logic ===
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');

        // Toggle active state
        const isActive = faqItem.classList.contains('active');

        // Close all other items (optional - enables single open item behavior)
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            // Reset icon rotation if needed
            const otherIcon = item.querySelector('.faq-icon');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
            if (icon) icon.style.transform = 'rotate(45deg)';
        }
    });
});


// === Scroll Reveal Animations ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Run once for better performance
        }
    });
}, observerOptions);

// === Initialize Scroll Animations on Load ===
window.addEventListener('DOMContentLoaded', function () {
    // Helper to add observer
    const observeElements = (selector, delayMultiplier = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('scroll-animate');
            if (delayMultiplier > 0) {
                el.style.transitionDelay = `${index * delayMultiplier}s`;
            }
            observer.observe(el);
        });
    };

    observeElements('section > .container > h2');
    observeElements('.service-item', 0.1);
    observeElements('.diff-card', 0.1);
    observeElements('.testimonial-card', 0.1);
    observeElements('.step', 0.1);
    observeElements('.problem-checklist li', 0.1);
});

// === Navbar Background on Scroll ===
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.9)';
        }
    });
}

// === Console Branding ===
console.log(
    '%c🚀 BUKY.IA ',
    'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);
console.log(
    '%cSistemas web estratégicos orientados a conversión',
    'color: #8b5cf6; font-size: 14px; font-weight: 600;'
);
