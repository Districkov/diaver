// ===== OPTIMIZED MAIN.JS =====
class DiaverApp {
    constructor() {
        this.components = new Map();
        this.init();
    }

    async init() {
        try {
            await this.loadTemplates();
            this.initComponents();
            this.bindEvents();
            this.initAnimations();
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    async loadTemplates() {
        const templates = [
            { id: 'header', url: 'components/header.html' },
            { id: 'footer', url: 'components/footer.html' }
        ];

        for (const template of templates) {
            try {
                const response = await fetch(template.url);
                if (response.ok) {
                    const html = await response.text();
                    this.components.set(template.id, html);
                }
            } catch (error) {
                console.warn(`Failed to load ${template.id}:`, error);
                this.components.set(template.id, this.getFallbackTemplate(template.id));
            }
        }
    }

    getFallbackTemplate(type) {
        const templates = {
            header: this.getFallbackHeader(),
            footer: this.getFallbackFooter()
        };
        return templates[type] || '';
    }

    getFallbackHeader() {
        const isIndexPage = !window.location.pathname.includes('pages/');
        const basePath = isIndexPage ? 'pages/' : '';
        
        return `
            <nav class="navbar">
                <div class="container">
                    <div class="nav-brand">
                        <a href="${isIndexPage ? 'index.html' : '../index.html'}" class="logo">ДИАВЕР</a>
                    </div>
                    <div class="nav-menu">
                        <a href="${isIndexPage ? 'index.html' : '../index.html'}" class="nav-link">Главная</a>
                        <a href="${isIndexPage ? 'pages/solutions.html' : 'solutions.html'}" class="nav-link">Решения</a>
                        <a href="${isIndexPage ? 'pages/products.html' : 'products.html'}" class="nav-link">Продукты</a>
                        <a href="${isIndexPage ? 'pages/company.html' : 'company.html'}" class="nav-link">Компания</a>
                        <a href="${isIndexPage ? 'pages/contacts.html' : 'contacts.html'}" class="nav-link">Контакты</a>
                    </div>
                    <div class="nav-actions">
                        <a href="tel:+78001234567" class="nav-phone">8 800 123-45-67</a>
                        <button class="nav-toggle" aria-label="Меню">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }

    getFallbackFooter() {
        const isIndexPage = !window.location.pathname.includes('pages/');
        const basePath = isIndexPage ? 'pages/' : '';

        return `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">ДИАВЕР</div>
                        <p>Разработка автоматизированных информационно-аналитических систем</p>
                    </div>
                    <div class="footer-section">
                        <h4>Решения</h4>
                        <a href="${basePath}solutions.html">Бизнес-аналитика</a>
                        <a href="${basePath}solutions.html">Искусственный интеллект</a>
                        <a href="${basePath}solutions.html">Автоматизация</a>
                    </div>
                    <div class="footer-section">
                        <h4>Компания</h4>
                        <a href="${basePath}company.html">О нас</a>
                        <a href="${basePath}company.html">Команда</a>
                        <a href="${basePath}company.html">Вакансии</a>
                    </div>
                    <div class="footer-section">
                        <h4>Контакты</h4>
                        <p>📞 8 800 123-45-67</p>
                        <p>✉️ info@diaver.ru</p>
                        <a href="${basePath}contacts.html" class="btn btn-outline">Написать нам</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 ООО "ДИАВЕР". Все права защищены.</p>
                </div>
            </div>
        `;
    }

    initComponents() {
        // Load header and footer
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        
        if (header) header.innerHTML = this.components.get('header');
        if (footer) footer.innerHTML = this.components.get('footer');

        // Initialize mobile menu
        this.initMobileMenu();
    }

    initMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
                document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu on link click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    bindEvents() {
        // Smooth scroll
        this.initSmoothScroll();
        
        // Lazy load images
        this.initLazyLoading();
        
        // Intersection Observer for animations
        this.initIntersectionObserver();
    }

    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initAnimations() {
        // Add CSS for animations
        if (!document.querySelector('#app-styles')) {
            const style = document.createElement('style');
            style.id = 'app-styles';
            style.textContent = `
                .fade-in { opacity: 0; transform: translateY(20px); }
                @keyframes fadeInUp {
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new DiaverApp());
} else {
    new DiaverApp();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiaverApp;
}