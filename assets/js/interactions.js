/* ===========================================
   LANDINGPARK.HU - MICRO-INTERACTIONS
   Enhanced user interaction effects
   ========================================== */

// Initialize all micro-interactions
document.addEventListener('DOMContentLoaded', function() {
  initializeRippleEffects();
  initializeTiltEffects();
  initializeFloatingActionButton();
  initializeFormInteractions();
  initializeTooltips();
  initializeCursorEffects();
  initializeParallaxElements();
  initializeImageReveal();
  initializeProgressBars();
});

// Ripple effect for buttons and interactive elements
function initializeRippleEffects() {
  const rippleElements = document.querySelectorAll('.ripple-effect, .btn-primary, .btn-secondary');
  
  rippleElements.forEach(element => {
    element.addEventListener('click', createRipple);
  });
  
  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: rippleAnimation 0.6s ease-out;
    `;
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    ripple.className = 'ripple';
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Tilt effect for cards and interactive elements
function initializeTiltEffects() {
  const tiltElements = document.querySelectorAll('.tilt-element, .service-card, .portfolio-item');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', handleTilt);
    element.addEventListener('mouseleave', resetTilt);
  });
  
  function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const rotateX = (deltaY / rect.height) * -10;
    const rotateY = (deltaX / rect.width) * 10;
    
    gsap.to(element, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
  
  function resetTilt(e) {
    const element = e.currentTarget;
    
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}

// Floating Action Button interactions
function initializeFloatingActionButton() {
  const fabBtn = document.getElementById('floatingBtn');
  if (!fabBtn) return;
  
  const fabMain = fabBtn.querySelector('.fab-main');
  
  fabBtn.addEventListener('click', () => {
    // Animate button click
    gsap.to(fabMain, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
    
    // Show contact form or open chat
    showQuickContact();
  });
  
  // Floating animation
  gsap.to(fabMain, {
    y: -5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

function showQuickContact() {
  // Create quick contact modal
  const modal = document.createElement('div');
  modal.className = 'quick-contact-modal';
  modal.innerHTML = `
    <div class="quick-contact-content">
      <div class="quick-contact-header">
        <h3>Gyors kapcsolatfelvétel</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="quick-contact-body">
        <p>Válasszon egy kapcsolatfelvételi módot:</p>
        <div class="contact-options">
          <a href="tel:+36301234567" class="contact-option">
            <i class="fas fa-phone"></i>
            <span>Telefonhívás</span>
          </a>
          <a href="mailto:info@landingpark.hu" class="contact-option">
            <i class="fas fa-envelope"></i>
            <span>Email küldés</span>
          </a>
          <a href="#contact" class="contact-option scroll-to-contact">
            <i class="fas fa-form"></i>
            <span>Kapcsolati űrlap</span>
          </a>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"></div>
  `;
  
  // Style the modal
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(modal);
  
  // Animate modal in
  gsap.fromTo(modal.querySelector('.quick-contact-content'), 
    {
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    }
  );
  
  gsap.fromTo(modal.querySelector('.modal-backdrop'),
    { opacity: 0 },
    { opacity: 1, duration: 0.3 }
  );
  
  // Close modal functionality
  const closeModal = () => {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => modal.remove()
    });
  };
  
  modal.querySelector('.close-btn').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  
  // Scroll to contact form
  modal.querySelector('.scroll-to-contact').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
    
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  });
}

// Enhanced form interactions
function initializeFormInteractions() {
  const formInputs = document.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    // Floating labels
    input.addEventListener('focus', () => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        gsap.to(label, {
          y: -25,
          scale: 0.8,
          color: '#667eea',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
          gsap.to(label, {
            y: 0,
            scale: 1,
            color: '#666',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });
    
    // Input validation animations
    input.addEventListener('input', () => {
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        const formLine = formGroup.querySelector('.form-line');
        if (formLine) {
          gsap.to(formLine, {
            scaleX: input.value ? 1 : 0,
            backgroundColor: input.checkValidity() ? '#10b981' : '#ef4444',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });
  });
  
  // Checkbox animations
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkmark = checkbox.nextElementSibling;
      if (checkmark) {
        gsap.to(checkmark, {
          scale: checkbox.checked ? 1.1 : 1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
      }
    });
  });
}

// Tooltip system
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
  
  function showTooltip(e) {
    const element = e.currentTarget;
    const tooltipText = element.dataset.tooltip;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px);
    `;
    
    document.body.appendChild(tooltip);
    
    const updatePosition = (e) => {
      tooltip.style.left = e.pageX + 10 + 'px';
      tooltip.style.top = e.pageY - tooltip.offsetHeight - 10 + 'px';
    };
    
    updatePosition(e);
    element.addEventListener('mousemove', updatePosition);
    
    gsap.to(tooltip, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    element._tooltip = tooltip;
    element._updatePosition = updatePosition;
  }
  
  function hideTooltip(e) {
    const element = e.currentTarget;
    const tooltip = element._tooltip;
    
    if (tooltip) {
      element.removeEventListener('mousemove', element._updatePosition);
      
      gsap.to(tooltip, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => tooltip.remove()
      });
    }
  }
}

// Custom cursor effects
function initializeCursorEffects() {
  if (window.innerWidth < 768) return; // Skip on mobile
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(102, 126, 234, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
  `;
  
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.1,
      ease: 'power2.out'
    });
  });
  
  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Parallax scrolling elements
function initializeParallaxElements() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.speed) || 0.5;
    
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// Image reveal animations
function initializeImageReveal() {
  const images = document.querySelectorAll('.image-reveal img');
  
  images.forEach(img => {
    const container = img.closest('.image-reveal');
    
    gsap.set(img, { scale: 1.3 });
    
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(img, {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out'
        });
        
        container.classList.add('revealed');
      }
    });
  });
}

// Progress bar animations
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const fill = bar.querySelector('.progress-fill');
    const percentage = parseFloat(bar.dataset.progress) || 100;
    
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(fill, {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power2.out'
        });
        
        bar.classList.add('progress-animated');
      }
    });
  });
}

// Add required CSS for interactions
const interactionStyles = document.createElement('style');
interactionStyles.textContent = `
  @keyframes rippleAnimation {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  .quick-contact-content {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    max-width: 400px;
    width: 90%;
  }
  
  .quick-contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }
  
  .quick-contact-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .close-btn:hover {
    background-color: #f5f5f5;
  }
  
  .contact-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .contact-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 2px solid #eee;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    transition: all 0.3s ease;
  }
  
  .contact-option:hover {
    border-color: #667eea;
    background-color: #f8f9ff;
    transform: translateY(-2px);
  }
  
  .contact-option i {
    font-size: 18px;
    color: #667eea;
  }
  
  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
  }
  
  .form-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #667eea;
    transform: scaleX(0);
    transform-origin: left;
    transition: all 0.3s ease;
  }
  
  .form-group {
    position: relative;
  }
  
  .custom-cursor {
    pointer-events: none;
  }
`;

document.head.appendChild(interactionStyles);

console.log('✨ Micro-interactions initialized!');