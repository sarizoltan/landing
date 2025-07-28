// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contactForm = document.getElementById('contactForm');

// Global Variables
let currentSlide = 0;
let slideInterval;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeNavigation();
    initializeScrollEffects();
    initializeForm();
});

// Slider Functionality
function initializeSlider() {
    // Start automatic slideshow
    startSlideshow();
    
    // Add event listeners for manual navigation
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    stopSlideshow();
    setTimeout(startSlideshow, 10000); // Restart after 10 seconds
}

function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Navigation Functionality
function initializeNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Add background to navbar when scrolling
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrollTop < window.innerHeight) {
        const parallaxSpeed = scrollTop * 0.5;
        heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
    }
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate cards when they come into view
            const cards = entry.target.querySelectorAll('.service-card, .portfolio-item');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}

// Form Functionality
function initializeForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation and styling
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Kérjük, töltse ki az összes kötelező mezőt!', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Kérjük, adjon meg egy érvényes e-mail címet!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Üzenetét sikeresen elküldtük! Hamarosan felvesszük Önnel a kapcsolatot.', 'success');
    contactForm.reset();
    
    // In a real application, you would send the data to a server here
    console.log('Form submitted:', data);
}

function handleInputFocus(e) {
    e.target.parentElement.classList.add('focused');
}

function handleInputBlur(e) {
    if (!e.target.value) {
        e.target.parentElement.classList.remove('focused');
    }
}

function handleInputChange(e) {
    if (e.target.value) {
        e.target.parentElement.classList.add('has-value');
    } else {
        e.target.parentElement.classList.remove('has-value');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification.success {
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid #00ff00;
            color: #00ff00;
        }
        
        .notification.error {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid #ff0000;
            color: #ff0000;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            padding: 15px;
            gap: 10px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .notification-message {
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: bold;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Add styles to head if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = notificationStyles;
        document.head.appendChild(style);
    }
    
    // Add notification to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Additional animations and effects
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    
    animatedElements.forEach(element => {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease-out';
    });
}

// Initialize scroll animations
addScrollAnimations();

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for slider navigation
    if (e.key === 'ArrowLeft') {
        previousSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 10000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 10000);
    }
});

// Preload next slide images for better performance
function preloadImages() {
    const imageUrls = [
        // Add any background images or other assets here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10));

// Smooth reveal animation for elements
function revealElements() {
    const reveals = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', debounce(revealElements, 50));

// Add CSS for reveal animation
const revealStyles = `
    .service-card,
    .portfolio-item,
    .pricing-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }
    
    .service-card.revealed,
    .portfolio-item.revealed,
    .pricing-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Add reveal styles
const style = document.createElement('style');
style.textContent = revealStyles;
document.head.appendChild(style);