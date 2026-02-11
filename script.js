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
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
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

// === Scroll Reveal Animations ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Don't unobserve so animation can repeat if user scrolls back up
        }
    });
}, observerOptions);

// === Initialize Scroll Animations on Load ===
window.addEventListener('DOMContentLoaded', function () {
    // Add animation classes to main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Skip hero section (first section)
        if (index > 0) {
            section.classList.add('scroll-animate');
            observer.observe(section);
        }
    });

    // Add staggered animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('scroll-animate');
        observer.observe(card);
    });

    // Add staggered animation to value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        card.classList.add('scroll-animate');
        observer.observe(card);
    });

    // Add staggered animation to differentiator items
    const diffItems = document.querySelectorAll('.differentiators-list li');
    diffItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.classList.add('scroll-animate');
        observer.observe(item);
    });

    // Add staggered animation to process steps
    const processSteps = document.querySelectorAll('.step');
    processSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
        step.classList.add('scroll-animate');
        observer.observe(step);
    });

    // Add staggered animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        card.classList.add('scroll-animate');
        observer.observe(card);
    });
});

// === Track CTA Clicks (prepared for analytics) ===
const ctaButtons = document.querySelectorAll('.cta-button, .nav-cta, .whatsapp-float');
ctaButtons.forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim() || 'WhatsApp Float';
        const buttonHref = this.getAttribute('href');

        // Log to console (replace with actual analytics when ready)
        console.log('CTA Click:', {
            text: buttonText,
            href: buttonHref,
            timestamp: new Date().toISOString()
        });

        // Uncomment when Google Analytics is configured
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'cta_click', {
        //         'event_category': 'engagement',
        //         'event_label': buttonText,
        //         'value': 1
        //     });
        // }
    });
});

// === Navbar Background on Scroll ===
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// === WhatsApp Float Button Pulse Animation ===
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    // Add subtle pulse every 5 seconds to draw attention
    setInterval(() => {
        whatsappFloat.style.animation = 'none';
        setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 0.6s ease-in-out';
        }, 10);
    }, 5000);
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// === Performance Optimization: Lazy Load Images ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
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
console.log(
    '%c¿Interesado en trabajar con nosotros? Escríbenos: https://wa.me/5492613387829',
    'color: #cbd5e1; font-size: 12px;'
);

// === Prevent Right Click on Production (Optional - Uncomment if needed) ===
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// === Page Load Performance Tracking ===
window.addEventListener('load', function () {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);

    // Uncomment when analytics is configured
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'timing_complete', {
    //         'name': 'load',
    //         'value': loadTime,
    //         'event_category': 'Performance'
    //     });
    // }
});
