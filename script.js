// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSmoothScrolling();
    initializeNavbar();
    initializeTypingEffect();
    initializeParallax();
    initializeLoadingAnimations();
    initializeFormAnimations();
    initializeMobileMenu();
});

// Initialize mobile menu
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// Initialize all animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay * 300);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in-element, .fade-in-left, .slide-in-left, .slide-in-right, .service-card, .team-member'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                updateActiveNavItem(targetId);
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Update active navigation item
function updateActiveNavItem(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar scroll effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section in navigation
        updateActiveSection();
    });
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavItem(`#${sectionId}`);
        }
    });
}

// Typing effect for hero title
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.dataset.text || typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const typeSpeed = 100;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

// Parallax effect for hero background
function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Loading animations for images
function initializeLoadingAnimations() {
    const images = document.querySelectorAll('.loading-image');
    
    images.forEach(image => {
        // Simulate image loading
        setTimeout(() => {
            image.classList.add('loaded');
            image.style.opacity = '1';
        }, Math.random() * 1000 + 500);
    });
}

// Form animations
function initializeFormAnimations() {
    const formInputs = document.querySelectorAll('.animated-input');
    
    formInputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            
            // Add ripple effect
            createRippleEffect(this);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Input validation animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });
    
    // Form submission animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Animate button
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Küldés...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Elküldve!';
                submitButton.classList.add('btn-success');
                submitButton.classList.remove('btn-primary');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.add('btn-primary');
                    submitButton.classList.remove('btn-success');
                    
                    // Reset input classes
                    formInputs.forEach(input => {
                        input.classList.remove('has-content');
                    });
                }, 2000);
            }, 2000);
        });
    }
}

// Create ripple effect for form inputs
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Service cards staggered animation
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200);
    });
}

// Team members hover effect enhancement
function enhanceTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const photo = this.querySelector('.photo-placeholder');
            photo.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        member.addEventListener('mouseleave', function() {
            const photo = this.querySelector('.photo-placeholder');
            photo.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Button hover effects enhancement
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.animate-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Update parallax and navbar on scroll
}, 16)); // ~60fps

// CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple-animation {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
    }
}

.focused {
    transform: scale(1.02);
    transition: all 0.3s ease;
}

.has-content {
    border-color: var(--primary-color) !important;
}
`;

// Inject CSS for ripple effect
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize enhanced effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    enhanceTeamHoverEffects();
    enhanceButtonEffects();
});

// Intersection Observer for better performance
function createIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add any additional animations here
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, options);
}

// Error handling for animations
function handleAnimationErrors() {
    window.addEventListener('error', function(e) {
        console.warn('Animation error:', e.message);
    });
}

// Initialize error handling
handleAnimationErrors();