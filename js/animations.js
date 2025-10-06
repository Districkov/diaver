// ===== OPTIMIZED ANIMATIONS.JS =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.parallaxElements = [];
        this.init();
    }

    init() {
        this.initIntersectionObserver();
        this.initScrollEffects();
        this.initCounters();
    }

    initIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        const animation = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        element.style.animationDelay = `${delay}ms`;
        element.classList.add('aos-animate', `aos-${animation}`);
    }

    initScrollEffects() {
        // Throttled scroll handler
        let ticking = false;
        const updateParallax = () => {
            this.updateParallaxElements();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Initialize parallax elements
        this.parallaxElements = Array.from(document.querySelectorAll('[data-parallax]'));
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    initCounters() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = this.formatNumber(current, element);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = this.formatNumber(target, element);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    formatNumber(num, element) {
        const options = JSON.parse(element.getAttribute('data-counter-options') || '{}');
        return options.separator ? 
            num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, options.separator) : 
            num.toString();
    }
}

// TypeWriter Class
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
        this.timeout = null;
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

        // Random variation for natural typing effect
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

        this.timeout = setTimeout(() => this.type(), typeSpeed);
    }

    destroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
}

// Initialize animations
function initAnimations() {
    new ScrollAnimations();
    
    // Initialize typing animation if element exists
    const typeElement = document.querySelector('[data-typewriter]');
    if (typeElement) {
        const texts = JSON.parse(typeElement.getAttribute('data-texts'));
        const options = JSON.parse(typeElement.getAttribute('data-options') || '{}');
        window.typeWriter = new TypeWriter(typeElement, texts, options);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, TypeWriter, initAnimations };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}