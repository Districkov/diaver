// Main JavaScript for Diaver IT Company Website
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initAnimations();
    initSmoothScroll();
    initMobileMenu();
    initFormValidation();
});

// Load Header with proper styling
function loadHeader() {
    const header = document.getElementById('header');
    if (header) {
        // Get current page path
        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.includes('index.html') || 
                           currentPath.endsWith('/diaver/') ||
                           currentPath.endsWith('/diaver') ||
                           !currentPath.includes('pages/');

        header.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <!-- Logo on the left -->
                    <div class="nav-brand">
                        <a href="${isIndexPage ? 'index.html' : '../index.html'}" class="logo">ДИАВЕР</a>
                    </div>

                    <!-- Navigation in the center -->
                    <div class="nav-menu">
                        <a href="${isIndexPage ? 'index.html' : '../index.html'}" class="nav-link ${isIndexPage ? 'active' : ''}">Главная</a>
                        <a href="${isIndexPage ? 'pages/solutions.html' : 'solutions.html'}" class="nav-link ${currentPath.includes('solutions') ? 'active' : ''}">Решения</a>
                        <a href="${isIndexPage ? 'pages/products.html' : 'products.html'}" class="nav-link ${currentPath.includes('products') ? 'active' : ''}">Продукты</a>
                        <a href="${isIndexPage ? 'pages/cases.html' : 'cases.html'}" class="nav-link ${currentPath.includes('cases') ? 'active' : ''}">Кейсы</a>
                        <a href="${isIndexPage ? 'pages/company.html' : 'company.html'}" class="nav-link ${currentPath.includes('company') ? 'active' : ''}">Компания</a>
                        <a href="${isIndexPage ? 'pages/contacts.html' : 'contacts.html'}" class="nav-link ${currentPath.includes('contacts') ? 'active' : ''}">Контакты</a>
                    </div>

                    <!-- Phone and mobile menu on the right -->
                    <div class="nav-actions">
                        <a href="tel:+78001234567" class="nav-phone">8 800 123-45-67</a>
                        <button class="nav-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Load Footer
function loadFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.includes('index.html') || 
                           currentPath.endsWith('/diaver/') ||
                           currentPath.endsWith('/diaver') ||
                           !currentPath.includes('pages/');

        const basePath = isIndexPage ? 'pages/' : '';

        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">ДИАВЕР</div>
                        <p>Разработка автоматизированных информационно-аналитических систем для бизнеса и госсектора</p>
                        <div class="social-links">
                            <a href="#" class="social-link">LinkedIn</a>
                            <a href="#" class="social-link">GitHub</a>
                            <a href="#" class="social-link">Telegram</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Решения</h4>
                        <a href="${basePath}solutions.html#analytics">Бизнес-аналитика</a>
                        <a href="${basePath}solutions.html#ai">Искусственный интеллект</a>
                        <a href="${basePath}solutions.html#automation">Автоматизация</a>
                        <a href="${basePath}solutions.html#security">Кибербезопасность</a>
                    </div>
                    <div class="footer-section">
                        <h4>Компания</h4>
                        <a href="${basePath}company.html">О нас</a>
                        <a href="${basePath}company.html#team">Команда</a>
                        <a href="${basePath}company.html#career">Вакансии</a>
                        <a href="${basePath}company.html#news">Новости</a>
                    </div>
                    <div class="footer-section">
                        <h4>Контакты</h4>
                        <p>📞 8 800 123-45-67</p>
                        <p>✉️ info@diaver.ru</p>
                        <p>📍 Москва, ул. Примерная, 123</p>
                        <a href="${basePath}contacts.html" class="btn btn-outline" style="margin-top: 1rem; padding: 0.5rem 1rem;">Написать нам</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 ООО "ДИАВЕР". Все права защищены.</p>
                </div>
            </div>
        `;
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function() {
                menu.classList.toggle('active');
                this.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navbar') && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });
        }
    }, 100);
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const menu = document.querySelector('.nav-menu');
                    const toggle = document.querySelector('.nav-toggle');
                    if (menu && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        toggle.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Basic Animations
function initAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe elements for animation
    document.querySelectorAll('section, .solution-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Validation (basic)
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '<span class="loading"></span> Отправка...';
            submitBtn.disabled = true;
            
            // Simulate send
            setTimeout(() => {
                showNotification('Сообщение отправлено! Мы свяжемся с вами скоро.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 10000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Make functions global
window.showNotification = showNotification;