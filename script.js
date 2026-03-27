// ============================================
// JavaScript - A la Bonne heure Coffee Shop
// ============================================

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');

// ============================================
// Mobile Menu Toggle
// ============================================

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// Newsletter Form Handling
// ============================================

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showFormMessage('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Simulate form submission
    formMessage.style.display = 'block';
    formMessage.textContent = 'Inscription en cours...';
    formMessage.classList.remove('success', 'error');
    
    // Simulate API call (in real scenario, this would be a server request)
    setTimeout(() => {
        showFormMessage('✓ Merci ! Vous êtes inscrit à notre newsletter.', 'success');
        emailInput.value = '';
        
        // Hide message after 4 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 4000);
    }, 800);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// ============================================
// Scroll Animations
// ============================================

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all menu items and value items
document.querySelectorAll('.menu-item, .value-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle hash links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Scroll to Top on Page Load
// ============================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ============================================
// Active Navigation Link on Scroll
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Add CSS for active nav link
// ============================================

const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// ============================================
// Lazy Load Images (Optional Enhancement)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Console message (branding)
// ============================================

console.log(
    '%c☕ A la Bonne heure - Coffee Shop ☕',
    'color: #8B6F47; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cMerci de visiter notre site !',
    'color: #A0826D; font-size: 12px;'
);