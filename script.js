// ===================================
// BUKY.IA - Landing Page JavaScript
// Conversion-focused functionality
// ===================================

// === DOM Elements ===
const contactForm = document.getElementById('contactForm');
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
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
        });
});
}


// === Form Submission Handler ===
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const nombre = document.getElementById('nombre').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validate required fields
        if (!nombre || !whatsapp || !mensaje) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `¡Hola! Soy ${nombre}.\n\n${mensaje}\n\n` +
            `WhatsApp: ${whatsapp}` +
            (email ? `\nEmail: ${email}` : '');

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp business number
        const whatsappNumber = '5492613387829';

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Reset form
        contactForm.reset();

        // Show success message
        alert('¡Gracias! Te redirigimos a WhatsApp para continuar la conversación.');
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
            const offsetTop = targetElement.offsetTop - 20;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === Scroll Animations with Intersection Observer ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-animate elements
scrollAnimateElements.forEach(element => {
    observer.observe(element);
});

// === Add scroll-animate class to sections on load ===
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

    // Add animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// === Phone Number Formatting ===
const whatsappInput = document.getElementById('whatsapp');
if (whatsappInput) {
    whatsappInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

        // Limit to reasonable phone number length
        if (value.length > 15) {
            value = value.substring(0, 15);
        }

        e.target.value = value;
    });
}

// === Form Field Validation Feedback ===
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = '';
    });
});

// === Prevent Form Spam (Simple Rate Limiting) ===
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 3000; // 3 seconds

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const currentTime = Date.now();

        if (currentTime - lastSubmitTime < SUBMIT_COOLDOWN) {
            e.preventDefault();
            alert('Por favor, espera unos segundos antes de enviar otro mensaje.');
            return false;
        }

        lastSubmitTime = currentTime;
    }, true);
}

// === Console Branding (Easter Egg) ===
console.log(
    '%c🚀 BUKY.IA ',
    'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);
console.log(
    '%cSistemas web orientados a conversión',
    'color: #8b5cf6; font-size: 14px; font-weight: 600;'
);
console.log(
    '%c¿Interesado en trabajar con nosotros? Escríbenos: https://wa.me/5492613387829',
    'color: #cbd5e1; font-size: 12px;'
);
