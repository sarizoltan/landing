/* ===========================================
   LANDINGPARK.HU - ADVANCED ANIMATIONS
   GSAP-powered animations and interactions
   ========================================== */

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation configuration
const animationConfig = {
  duration: 1,
  ease: 'power2.out',
  stagger: 0.1
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  initializeHeroAnimations();
  initializeServiceAnimations();
  initializeBenefitAnimations();
  initializeProcessAnimations();
  initializePricingAnimations();
  initializePortfolioAnimations();
  initializeContactAnimations();
  initializeHoverAnimations();
  initializeTextAnimations();
});

// Scroll-triggered animations
function initializeScrollAnimations() {
  // Fade up animations
  gsap.utils.toArray('.gsap-fade-up').forEach(element => {
    gsap.fromTo(element, 
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Fade left animations
  gsap.utils.toArray('.gsap-fade-left').forEach(element => {
    gsap.fromTo(element,
      {
        x: -60,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Fade right animations
  gsap.utils.toArray('.gsap-fade-right').forEach(element => {
    gsap.fromTo(element,
      {
        x: 60,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Scale animations
  gsap.utils.toArray('.gsap-scale').forEach(element => {
    gsap.fromTo(element,
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: animationConfig.duration,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Stagger children animations
  gsap.utils.toArray('.stagger-children').forEach(container => {
    gsap.fromTo(container.children,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: animationConfig.ease,
        stagger: animationConfig.stagger,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Hero section animations
function initializeHeroAnimations() {
  const heroTl = gsap.timeline({ delay: 0.5 });
  
  heroTl
    .from('.hero-badge', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .from('.hero-title .title-line', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-description', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-cta .btn-primary, .hero-cta .btn-secondary', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.hero-stats .stat-item', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.scroll-indicator', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3');

  // Floating background elements
  gsap.utils.toArray('.floating-element').forEach((element, index) => {
    gsap.to(element, {
      y: 'random(-20, 20)',
      x: 'random(-10, 10)',
      rotation: 'random(-180, 180)',
      duration: 'random(15, 25)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 2
    });
  });

  // Hotspot animations
  gsap.utils.toArray('.hotspot').forEach(hotspot => {
    gsap.to(hotspot, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

// Service cards animations
function initializeServiceAnimations() {
  gsap.utils.toArray('.service-card').forEach(card => {
    const icon = card.querySelector('.service-icon');
    const features = card.querySelectorAll('.feature-item');
    
    // Icon hover animation
    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
      
      gsap.from(features, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Benefits timeline animations
function initializeBenefitAnimations() {
  ScrollTrigger.create({
    trigger: '.benefits-timeline',
    start: 'top center',
    end: 'bottom center',
    onUpdate: self => {
      const progress = self.progress;
      gsap.to('.timeline-line', {
        scaleY: progress,
        transformOrigin: 'top center',
        duration: 0.3,
        ease: 'none'
      });
    }
  });

  gsap.utils.toArray('.benefit-item').forEach((item, index) => {
    const isEven = index % 2 === 0;
    
    gsap.fromTo(item,
      {
        x: isEven ? -100 : 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Process step animations
function initializeProcessAnimations() {
  gsap.utils.toArray('.process-step').forEach((step, index) => {
    gsap.fromTo(step,
      {
        y: 80,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      }
    );
  });
}

// Pricing card animations
function initializePricingAnimations() {
  const pricingCard = document.querySelector('.pricing-card');
  if (!pricingCard) return;

  ScrollTrigger.create({
    trigger: pricingCard,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(pricingCard,
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)'
        }
      );

      // Animate features
      gsap.from('.feature-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.3
      });
    }
  });
}

// Portfolio animations
function initializePortfolioAnimations() {
  gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    gsap.fromTo(item,
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      }
    );
  });
}

// Contact section animations
function initializeContactAnimations() {
  const contactForm = document.querySelector('.contact-form');
  const contactInfo = document.querySelector('.contact-info');

  if (contactForm) {
    gsap.fromTo(contactForm,
      {
        x: 60,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactForm,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  if (contactInfo) {
    gsap.fromTo(contactInfo,
      {
        x: -60,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactInfo,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
}

// Hover animations
function initializeHoverAnimations() {
  // Card lift effects
  gsap.utils.toArray('.hover-lift').forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Scale effects
  gsap.utils.toArray('.hover-scale').forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Button glow effects
  gsap.utils.toArray('.btn-glow').forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Text reveal animations
function initializeTextAnimations() {
  gsap.utils.toArray('.reveal-text').forEach(element => {
    const chars = element.textContent.split('');
    element.innerHTML = chars.map(char => 
      `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    gsap.fromTo(element.querySelectorAll('.char'),
      {
        y: '100%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Custom easing functions
gsap.registerEase('bounceOut', function(progress) {
  return 1 - Math.abs(Math.cos(progress * Math.PI * 2.5)) * Math.pow(0.5, progress * 10);
});

// Performance optimization
ScrollTrigger.config({
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
});

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

console.log('🎨 Advanced animations initialized!');