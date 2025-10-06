// Custom animations and scroll effects
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.cacheElements();
        this.initIntersectionObserver();
        this.initScrollEffects();
    }

    cacheElements() {
        this.elements = document.querySelectorAll('[data-aos]');
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }

    initScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', this.handleParallax.bind(this));
        
        // Header background on scroll
        window.addEventListener('scroll', this.handleHeaderScroll.bind(this));
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(17, 24, 39, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(17, 24, 39, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Typing animation
class TypeWriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            delay: options.delay || 2000,
            loop: options.loop !== false,
            ...options
        };
        
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        // Add random variation to make it look more natural
        typeSpeed += Math.random() * 50;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.options.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex++;
            if (this.textIndex >= this.texts.length) {
                if (this.options.loop) {
                    this.textIndex = 0;
                } else {
                    return;
                }
            }
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter animation
class Counter {
    constructor(element, target, options = {}) {
        this.element = element;
        this.target = target;
        this.options = {
            duration: options.duration || 2000,
            delay: options.delay || 0,
            separator: options.separator || '',
            ...options
        };
        
        this.startTime = null;
        this.init();
    }

    init() {
        setTimeout(() => {
            this.startTime = Date.now();
            this.animate();
        }, this.options.delay);
    }

    animate() {
        const now = Date.now();
        const elapsed = now - this.startTime;
        const progress = Math.min(elapsed / this.options.duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = Math.floor(this.target * easeOutQuart);
        this.element.textContent = this.formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.element.textContent = this.formatNumber(this.target);
        }
    }

    formatNumber(num) {
        return this.options.separator ? 
            num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator) : 
            num.toString();
    }
}

// Initialize all animations
function initAnimations() {
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize typing animation if element exists
    const typeElement = document.querySelector('[data-typewriter]');
    if (typeElement) {
        const texts = JSON.parse(typeElement.getAttribute('data-texts'));
        const options = JSON.parse(typeElement.getAttribute('data-options') || '{}');
        new TypeWriter(typeElement, texts, options);
    }
    
    // Initialize counters
    document.querySelectorAll('[data-counter]').forEach(element => {
        const target = parseInt(element.getAttribute('data-counter'));
        const options = JSON.parse(element.getAttribute('data-counter-options') || '{}');
        new Counter(element, target, options);
    });
    
    // Initialize hover effects
    initHoverEffects();
}

// Hover effects for interactive elements
function initHoverEffects() {
    const cards = document.querySelectorAll('.solution-card, .tech-category, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, TypeWriter, Counter, initAnimations };
}