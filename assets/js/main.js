/* ===========================================
   LANDINGPARK.HU - MAIN JAVASCRIPT
   Core functionality and initialization
   ========================================== */

// Global variables
let isLoading = true;
let currentTheme = 'light';
let scrollProgress = 0;
let isMenuOpen = false;

// DOM Elements
const elements = {
  loadingScreen: null,
  header: null,
  navToggle: null,
  navMenu: null,
  themeToggle: null,
  scrollProgressBar: null,
  backToTop: null,
  floatingBtn: null,
  contactForm: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  initializeLoading();
  initializeTheme();
  initializeNavigation();
  initializeScrollEffects();
  initializeTypedText();
  initializeCounters();
  initializeParticles();
  initializeContactForm();
  initializePortfolioFilter();
  initializeMagnetic();
  
  console.log('🚀 Landingpark.hu initialized successfully!');
});

// Initialize DOM elements
function initializeElements() {
  elements.loadingScreen = document.getElementById('loadingScreen');
  elements.header = document.getElementById('header');
  elements.navToggle = document.getElementById('navToggle');
  elements.navMenu = document.getElementById('navMenu');
  elements.themeToggle = document.getElementById('themeToggle');
  elements.scrollProgressBar = document.getElementById('scrollProgressBar');
  elements.backToTop = document.getElementById('backToTop');
  elements.floatingBtn = document.getElementById('floatingBtn');
  elements.contactForm = document.getElementById('contactForm');
}

// Loading screen functionality
function initializeLoading() {
  if (!elements.loadingScreen) return;
  
  const loadingBar = elements.loadingScreen.querySelector('.loading-bar');
  const loadingPercent = elements.loadingScreen.querySelector('.loading-percent');
  
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    if (loadingBar) loadingBar.style.width = `${progress}%`;
    if (loadingPercent) loadingPercent.textContent = `${Math.round(progress)}%`;
    
    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        isLoading = false;
        document.body.style.overflow = 'visible';
        
        // Trigger entrance animations
        gsap.from('.hero-content > *', {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 0.3
        });
      }, 300);
    }
  }, 100);
}

// Theme functionality
function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);
  
  // Theme toggle event
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      currentTheme = e.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
    }
  });
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
  
  // Animate theme transition
  gsap.to(document.body, {
    duration: 0.3,
    ease: 'power2.inOut'
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update theme toggle icon
  const themeIcon = elements.themeToggle?.querySelector('i');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Navigation functionality
function initializeNavigation() {
  if (!elements.navToggle || !elements.navMenu) return;
  
  // Mobile menu toggle
  elements.navToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !elements.navMenu.contains(e.target) && !elements.navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });
  
  // Update active navigation
  window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  elements.navToggle.classList.toggle('active');
  elements.navMenu.classList.toggle('active');
  document.body.style.overflow = isMenuOpen ? 'hidden' : 'visible';
  
  // Animate menu items
  if (isMenuOpen) {
    gsap.from('.nav-menu.active .nav-item', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}

function closeMobileMenu() {
  isMenuOpen = false;
  elements.navToggle.classList.remove('active');
  elements.navMenu.classList.remove('active');
  document.body.style.overflow = 'visible';
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const headerHeight = elements.header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    gsap.to(window, {
      scrollTo: targetPosition,
      duration: 1,
      ease: 'power2.inOut'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      closeMobileMenu();
    }
  }
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - elements.header.offsetHeight - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Scroll effects
function initializeScrollEffects() {
  window.addEventListener('scroll', throttle(handleScroll, 10));
  
  // Back to top button
  if (elements.backToTop) {
    elements.backToTop.addEventListener('click', scrollToTop);
  }
}

function handleScroll() {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = (scrollTop / documentHeight) * 100;
  
  // Update scroll progress bar
  if (elements.scrollProgressBar) {
    elements.scrollProgressBar.style.width = `${scrollProgress}%`;
  }
  
  // Update header appearance
  if (elements.header) {
    if (scrollTop > 100) {
      elements.header.classList.add('scrolled');
    } else {
      elements.header.classList.remove('scrolled');
    }
  }
  
  // Show/hide back to top button
  if (elements.backToTop) {
    if (scrollTop > 500) {
      elements.backToTop.classList.add('visible');
    } else {
      elements.backToTop.classList.remove('visible');
    }
  }
  
  // Parallax effects
  updateParallax(scrollTop);
}

function scrollToTop() {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1.5,
    ease: 'power2.inOut'
  });
}

function updateParallax(scrollTop) {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrollTop * speed);
    gsap.set(element, { y: yPos });
  });
}

// Typed text animation
function initializeTypedText() {
  const typedElement = document.getElementById('typedText');
  if (!typedElement) return;
  
  const texts = [
    'konvertálnak',
    'eladnak',
    'vonzzák az ügyfeleket',
    'növelik a bevételt'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
  }
  
  typeText();
}

// Counter animations
function initializeCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.count);
    const duration = 2;
    
    gsap.to(counter, {
      innerHTML: target,
      duration: duration,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      onUpdate: function() {
        counter.classList.add('counting');
      },
      onComplete: function() {
        counter.classList.remove('counting');
      }
    });
  };
  
  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Particles system
function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation delay
    const x = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 10 + Math.random() * 10;
    
    particle.style.left = `${x}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        createParticle();
      }
    }, (duration + delay) * 1000);
  }
}

// Contact form functionality
function initializeContactForm() {
  if (!elements.contactForm) return;
  
  elements.contactForm.addEventListener('submit', handleFormSubmit);
  
  // Form field animations
  const formInputs = elements.contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Real-time validation
    input.addEventListener('input', () => {
      validateField(input);
    });
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const submitBtn = elements.contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.style.opacity = '0';
  btnLoading.style.display = 'block';
  
  // Simulate form submission
  try {
    await simulateFormSubmission();
    showNotification('Üzenet sikeresen elküldve! Hamarosan felvesszük Önnel a kapcsolatot.', 'success');
    elements.contactForm.reset();
    
    // Reset form field states
    const formGroups = elements.contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('focused'));
    
  } catch (error) {
    showNotification('Hiba történt az üzenet küldése során. Kérjük próbálja újra.', 'error');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.opacity = '1';
    btnLoading.style.display = 'none';
  }
}

function simulateFormSubmission() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% success rate for demo
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error('Simulation error'));
      }
    }, 2000);
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  const isRequired = field.required;
  
  let isValid = true;
  let errorMessage = '';
  
  if (isRequired && !value) {
    isValid = false;
    errorMessage = 'Ez a mező kötelező';
  } else if (fieldType === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Kérjük adjon meg egy érvényes email címet';
  }
  
  updateFieldValidation(field, isValid, errorMessage);
  return isValid;
}

function updateFieldValidation(field, isValid, errorMessage) {
  const formGroup = field.parentElement;
  const existingError = formGroup.querySelector('.field-error');
  
  // Remove existing error
  if (existingError) {
    existingError.remove();
  }
  
  // Update field appearance
  if (isValid) {
    formGroup.classList.remove('error');
    formGroup.classList.add('valid');
  } else {
    formGroup.classList.add('error');
    formGroup.classList.remove('valid');
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = errorMessage;
    formGroup.appendChild(errorElement);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Portfolio filter functionality
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!filterButtons.length || !portfolioItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
          item.style.display = 'block';
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });
}

// Magnetic effect for interactive elements
function initializeMagnetic() {
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      </div>
      <div class="notification-text">
        <div class="notification-title">${type === 'success' ? 'Siker!' : type === 'error' ? 'Hiba!' : 'Információ'}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="notification-progress"></div>
  `;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    minWidth: '300px',
    maxWidth: '400px',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Progress bar animation
  const progressBar = notification.querySelector('.notification-progress');
  progressBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255,255,255,0.3);
    width: 100%;
    transform-origin: left;
    animation: notificationProgress 5s linear forwards;
  `;
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => removeNotification(notification));
  
  // Auto remove
  setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Utility functions
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
  };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Add notification progress animation
const style = document.createElement('style');
style.textContent = `
  @keyframes notificationProgress {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
  
  .notification-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
  
  .notification-icon {
    font-size: 20px;
    margin-top: 2px;
  }
  
  .notification-text {
    flex: 1;
  }
  
  .notification-title {
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .notification-message {
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
`;
document.head.appendChild(style);